/**
 * 图片压缩和缓存工具类
 */

// 获取 IndexDB 实例
const getIndexDB = () => {
  return new Promise((resolve, reject) => {
    const request = window.indexedDB.open("compressImg", 1); // 压缩图片的indexDB

    request.onerror = (event) => {
      console.error("数据库打开失败:", event);
      reject(event);
    };

    request.onsuccess = (event) => {
      console.log("数据库打开成功");
      resolve(event.target.result);
    };

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains("compressedImg")) {
        db.createObjectStore("compressedImg", { keyPath: "id" });
      }
    };
  });
};

/**
 * 从 IndexDB 获取压缩后的图片
 * @returns {Promise<Array|null>} 压缩后的图片数组或 null
 */
const getCompressedImagesFromDB = async () => {
  try {
    const db = await getIndexDB();
    const transaction = db.transaction(["compressedImg"], "readonly");
    const store = transaction.objectStore("compressedImg");

    return new Promise((resolve, reject) => {
      const request = store.getAll();

      request.onsuccess = () => {
        const results = request.result;
        if (results && results.length > 0) {
          // 按时间戳排序，确保获取最新的数据
          results.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
          resolve(results.map((item) => item.data));
        } else {
          resolve(null);
        }
      };

      request.onerror = (error) => {
        console.error("读取缓存数据失败:", error);
        reject(error);
      };
    });
  } catch (error) {
    console.error("获取缓存数据时发生错误:", error);
    return null;
  }
};

/**
 * 压缩图片列表
 * @param {Array} originalImgList 原始图片列表
 * @returns {Promise<Array>} 压缩后的图片列表
 */
const compressImages = (originalImgList) => {
  return new Promise((resolve) => {
    const compressedList = [];
    let completedCount = 0;
    originalImgList.forEach((imgUrl, index) => {
      const img = new Image();
      img.src = imgUrl;
      img.onload = () => {
        console.log("开始压缩", img);
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0, img.width, img.height);
        const base64 = canvas.toDataURL("image/jpeg", 0.5);
        compressedList[index] = base64;
        completedCount++;
        if (completedCount === originalImgList.length) {
          resolve(compressedList);
        }
      };
    });
  });
};

/**
 * 将压缩后的图片存储到 IndexDB
 * @param {Array} compressedImages 压缩后的图片数组
 * @returns {Promise<void>}
 */
const storeCompressedImages = async (compressedImages) => {
  try {
    const db = await getIndexDB();
    const transaction = db.transaction(["compressedImg"], "readwrite");
    const store = transaction.objectStore("compressedImg");

    // 清除旧数据
    await new Promise((resolve, reject) => {
      const clearRequest = store.clear();
      clearRequest.onsuccess = () => resolve();
      clearRequest.onerror = (e) => reject(e);
    });

    // 存储新数据
    const storePromises = compressedImages.map((item, index) => {
      return new Promise((resolve, reject) => {
        const request = store.add({
          id: Date.now() + index,
          data: item,
          timestamp: new Date().toISOString(),
        });
        request.onsuccess = () => resolve();
        request.onerror = (e) => reject(e);
      });
    });

    await Promise.all(storePromises);
    console.log("所有图片已成功存储到 IndexDB");

    return new Promise((resolve, reject) => {
      transaction.oncomplete = () => {
        console.log("事务完成");
        resolve();
      };
      transaction.onerror = (event) => {
        console.error("事务错误:", event);
        reject(event);
      };
    });
  } catch (error) {
    console.error("存储压缩图片时发生错误:", error);
    throw error;
  }
};

/**
 * 获取场景图片列表
 * @returns {Promise<Object>} 返回场景图片列表，格式为 { sceneName: imgList[] }
 */
const getScenesImgList = async () => {
    try {
        // 获取所有场景目录下的图片
        const sceneImages = import.meta.glob('/public/scenes/*/imgs/*.jpg', { eager: true })
        
        // 整理数据结构
        const scenes = {}
        
        // 遍历所有图片路径
        Object.keys(sceneImages).forEach(path => {
            // 从路径中提取场景名称
            // 例如: /public/scenes/scene1/imgs/1.jpg => scene1
            const sceneName = path.split('/')[3]
            
            if (!scenes[sceneName]) {
                scenes[sceneName] = []
            }
            
            // 将图片路径添加到对应场景
            scenes[sceneName].push({
                path: path,
                url: sceneImages[path].default
            })
        })
        
        // 对每个场景的图片按文件名排序
        Object.keys(scenes).forEach(sceneName => {
            scenes[sceneName].sort((a, b) => {
                const nameA = a.path.split('/').pop()
                const nameB = b.path.split('/').pop()
                return nameA.localeCompare(nameB, undefined, { numeric: true })
            })
        })
        
        console.log('获取到的场景图片列表:', scenes)
        return scenes
    } catch (error) {
        console.error('获取场景图片列表失败:', error)
        return {}
    }
}

/**
 * 处理图片压缩的完整流程：检查缓存、压缩、存储
 * @param {Array} imageList 需要压缩的图片列表
 * @returns {Promise<{images: Array, fromCache: boolean}>} 压缩后的图片数组和是否来自缓存的标志
 */
const handleImageCompression = async (imageList) => {
  try {
    // 先尝试从 IndexDB 获取缓存的压缩图片
    const cachedImages = await getCompressedImagesFromDB();

    if (cachedImages && cachedImages.length === imageList.length) {
      console.log("从缓存中获取压缩后的图片");
      return {
        images: cachedImages,
        fromCache: true,
      };
    }

    // 如果没有缓存或缓存不完整，则重新压缩
    console.log("没有找到缓存，开始压缩图片");
    const startTime = new Date();
    const compressedImages = await compressImages(imageList);
    const endTime = new Date();
    console.log("压缩完毕", (endTime - startTime) / 1000 + "s");

    // 存储压缩后的图片
    await storeCompressedImages(compressedImages);

    return {
      images: compressedImages,
      fromCache: false,
    };
  } catch (error) {
    console.error("处理图片时发生错误:", error);
    throw error;
  }
};

export {
  getCompressedImagesFromDB,
  compressImages,
  storeCompressedImages,
  handleImageCompression,
  // getScenesImgList
};
