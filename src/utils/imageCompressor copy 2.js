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
 * 获取场景图片列表
 * @returns {Promise<Object>} 返回场景图片列表，格式为 { sceneName: imgList[] }
 */
const getScenesImgList = async () => {
  try {
    // 获取所有场景目录下的图片
    const sceneImages = import.meta.glob("/public/scenes/*/imgs/*.jpg", {
      eager: true,
    });

    // 整理数据结构
    const scenes = {};

    // 遍历所有图片路径
    Object.keys(sceneImages).forEach((path) => {
      // 从路径中提取场景名称
      // 例如: /public/scenes/scene1/imgs/1.jpg => scene1
      const sceneName = path.split("/")[3];

      if (!scenes[sceneName]) {
        scenes[sceneName] = [];
      }

      // 将图片路径添加到对应场景
      scenes[sceneName].push({
        path: path,
        url: sceneImages[path].default,
      });
    });

    // 对每个场景的图片按文件名排序
    Object.keys(scenes).forEach((sceneName) => {
      scenes[sceneName].sort((a, b) => {
        const nameA = a.path.split("/").pop();
        const nameB = b.path.split("/").pop();
        return nameA.localeCompare(nameB, undefined, { numeric: true });
      });
    });

    console.log("获取到的场景图片列表:", scenes);
    return scenes;
  } catch (error) {
    console.error("获取场景图片列表失败:", error);
    return {};
  }
};

/**
 * 生成场景配置文件内容
 * @param {Object} scenes 场景数据
 * @returns {string} 文件内容
 */
const generateScenesConfig = (scenes) => {
  const sceneExports = {};

  // 处理每个场景的数据
  Object.keys(scenes).forEach((sceneName) => {
    const scene = scenes[sceneName];
    sceneExports[sceneName] = {
      name: sceneName,
      images: scene.images
        .map((img) => {
          // 确保 img 对象存在所需的所有属性
          if (!img || !img.compressed || !img.path) {
            console.warn("图片数据不完整:", img);
            return null;
          }

          const name = img.path.split("/").pop();
          return {
            name,
            // 原始图片路径
            path: `/scenes/${sceneName}/imgs/${name}`,
            // 压缩后的图片数据
            compressedData: img.compressed,
          };
        })
        .filter(Boolean), // 移除空值
    };
  });

  return `// 该文件由图片压缩工具自动生成，请勿手动修改
export const scenes = ${JSON.stringify(sceneExports, null, 2)};
`;
};

/**
 * 处理图片压缩的完整流程：压缩并生成配置文件
 * @returns {Promise<{config: Object}>} 返回配置信息
 */
const handleImageCompression = async () => {
  try {
    // 获取所有场景图片
    const scenesImgList = await getScenesImgList();
    console.log("开始压缩所有场景图片");

    // 用于存储最终的场景配置
    const scenesConfig = {};

    // 处理每个场景
    for (const [sceneName, images] of Object.entries(scenesImgList)) {
      console.log(`正在处理场景: ${sceneName}`);

      // 获取图片URL列表
      const imageUrls = images.map((img) => img.url);

      // 压缩图片
      const compressedImages = await compressImages(imageUrls);

      // 将压缩后的图片数据添加到配置中
      scenesConfig[sceneName] = {
        name: sceneName,
        images: images.map((img, index) => {
          const compressedImage = compressedImages[index];
          return {
            path: img.path,
            name: img.path.split("/").pop(),
            original: img.path,
            compressed: compressedImage,
          };
        }),
      };
    }

    // 生成配置文件内容
    const fileContent = generateScenesConfig(scenesConfig);

    // 创建并下载配置文件
    const blob = new Blob([fileContent], { type: 'text/javascript' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'scenes.js';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    console.log("所有场景图片处理完成，配置文件已下载");

    // 返回配置
    return {
      config: scenesConfig,
    };
  } catch (error) {
    console.error("处理图片时发生错误:", error);
    throw error;
  }
};

export { compressImages, handleImageCompression, getScenesImgList };
