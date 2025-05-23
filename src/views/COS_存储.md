# COS使用手册

## 产品概览

### (1)产品简介

对象存储（ChinaUnicom Object Storage，COS）是由联通云推出的无目录层次结构、无数据格式限制，可容纳海量数据且支持 HTTP/HTTPS 协议访问的分布式云存储服务。

### (2)产品特性

**方便易用**：提供基于Web的管理控制台、RESTFul API、命令行工具和图形化客户端等多种访问方式，您可以随时随地通过网络管理您的数据。
**稳定持久**：对象存储提供数据跨多个设备的冗余存储，支持跨区复制、异地备份与恢复，为用户数据持久存储提供可靠保障。同时，基于高可用的架构设计，消除单点故障，确保数据业务的持续性。
**弹性扩展**：采用按量付费模式，无须一次性提前付费，成本低廉。自动弹性扩展，不限制存储容量和文件数，满足海量非结构化数据存储需求。
**安全可靠**：支持通过安全通道进行数据传输、细粒度权限控制，存储桶访问策略灵活配置，使用联通云（Identity and Access Management）IAM管理用户权限，保障数据安全。

### (3)应用场景

**内容分发**
网站服务通常会在动态网页中，根据一定规则将经常变动和长期不变的资源区分开，静态资源就是指长期不变的非结构化数据资源。COS提供了静态资源的存储和分发能力，减轻计算节点的压力，并利用无限容量、高频读写的特性，为静态资源提供可扩展和可靠的存储。用户可以将网站中的静态内容（包括音视频、图片等文件）全部托管在对象存储桶中。

**备份归档**
联通云COS提供了高持久性、高扩展性且安全的数据归档存储解决方案，用于备份归档您的业务数据。使用COS的版本控制功能，可以为您的数据提供进一步的保护。

## 产品详细信息

### (1).功能概览

COS主要提供以下功能:

<table>
    <tr>
        <td colspan="2">功能</td>
        <td>说明</td>
   </tr>
    <tr>
        <td rowspan="2">操作</td>
        <td>存储桶操作</td>
        <td>支持创建、查询、删除、清空存储桶</td>
    </tr>
    <tr>
        <td>对象操作</td>
        <td>对象（文件/文件夹）：上传、下载、删除、预览操作</td>
    </tr>
    <tr>
        <td rowspan="2">数据管理</td>
        <td>生命周期</td>
        <td>支持用户设定规则，对指定对象在某个时间（天数）后进行自动删除</td>
    </tr>
    <tr>
        <td>监控与告警</td>
        <td>用户可以在控制台查看存储桶容量、对象数量、读写请求数、访问流量等监控数据及变化趋势</td>
    </tr>
</table>

### (2).规格限制

<table>
    <tr>
        <th>分类</th>
        <th>规则与限制</th>
        <th>详细描述</th>
    </tr>
    <tr>
        <td rowspan=3 >存储桶</td>
        <td>限制</td>
        <td>1.存储桶一旦创建成功，名称和所处地域不能修改<br>2.同一用户账号下所有存储桶名称唯一且不支持重命名<br>3.名称支持大、小写字母和数字[a-z，A-Z，0-9]、中划线“-”及其组合<br>4.单个文件最大是5G,但是不能一次性上传，必须要走分片上传，一个分片最小是5M，可以自己配置，分片数最大是1W</td>
    </tr>
    <tr>
        <td>存储桶数量</td>
        <td>每个账户（含子用户）最多可创建1000个（默认）</td>
    </tr>
    <tr>
        <td>对象数量</td>
        <td>每个存储桶中，对象数量不超过1亿</td>
    </tr>
    <tr>
        <td>生命周期</td>
        <td>过期删除</td>
        <td>最短时长1天</td>
    </tr>
</table>

## 定价

对象存储COS服务目前按照按量计费定价，计费项按照存储容量、读写请求数、流量三种计费。

|计费项|容量(GB)|读写请求数|流量(GB)|
|:-|:-:|:-:|:-:|
|计费单位|元/GB/天|元/万次|元/GB|
|单价|0.001|0.01|0.1|

## 对象存储COS入门

联通云支持三种不同的方式来使用您的对象存储产品，请根据自身场景灵活选择使用方式：控制台，RESTFul API，图形化客户端。

### 使用控制台入门

通过控制台操作，基本流程如下：

![控制台流程](./console.png)

在控制台界面通过可视化的点击操作来快速开通和使用您的对象存储服务。

#### 第一步： 开通对象存储产品

登录对象存储COS控制台，选中要开通服务的区域，点击立即开通。如果没有账号，请先注册联通云账号。

#### 第2步：创建存储桶

单击左侧导航存储桶列表，进入并创建存储桶。

#### 第3步：上传对象

通过存储桶列表进入已创建好的存储桶，在文件列表中点击上传文件，将您的本地文件上传至存储桶。

#### 第4步：下载对象

在存储桶的文件列表页面，您可以查看已上传的文件信息，直接点击下载文件，或复制文件的下载链接后，在其他地方下载存储对象。

#### 第5步：删除对象

在存储桶的文件列表页面可以单机对应的删除按钮直接删除对象。

#### 第6步：删除存储桶

在存储桶列表找到想要删除的存储桶，单击对应的删除按钮，然后点击确认即可。
注意：删除存储桶时，需保证其中没有任何文件、目录，否则将无法删除。

#### 权限概念

##### 私有读写

私有读写需要进行身份验证后才能对存储桶进行访问操作，私有读写是存储桶的默认访问权限，也是最安全的访问权限。
只有该存储桶的创建者及有授权的账号才对该存储桶中的对象有读写权限，其他任何人对该存储桶中的对象都没有读写权限。存储桶访问权限默认为私有读写，推荐使用。

##### 公有读私有写

公有读私有写可对存储桶进行匿名读操作, 写操作需要进行身份验证。如果想要使用COS对象存储托管静态网站，选择“公有读私有写”权限。
任何人(包括匿名访问者)都对该存储桶的读权限，但只有存储桶创建者及有授权的账号才对该存储桶中的对象有写权限。
注意：
公有读权限可以通过匿名身份直接读取您存储桶中的数据，存在一定的安全风险，为确保您的数据安全，不推荐此配置，建议您选择私有。

##### 公有读写

公有读写可对存储桶进行匿名读操作和写操作。



## 文档与服务

### 5.1、控制台使用

#### 第一步： 在对应区域开通COS（对象存储）产品

![cos开通](console.png)

#### 第二步：在各个区域产品中可以查看各个产品的概览数据

![cos概览](overview.png)

#### 第三步：在各个产品中可以创建存储桶（每个账户存储桶限制为1000）

![cos创建存储桶](create_bucket.png)

#### 第四步：在各个存储桶中可以通过页面上传文件

![cos上传文件](upload.png)

#### 第五步：可以下载对应的文件
注意：如果点击下载后无反应，请检查浏览器的安全设置，“不安全内容”权限设为“允许”。

![cos下载文件](download.png)

#### 第六步：可以删除选中的文件或文件夹
可以多选，点击【操作】进行批量删除，也可以点击某一文件/文件夹后【删除】按钮进行单个文件/文件夹的删除操作。

注意：
1. 删除操作一次最多删除1000个对象，如果文件夹下对象总数大于1000，则删除文件夹时实际仅删除了前1000个对象，文件夹依然存在。
2. 存储桶内含有对象时，存储桶不可删除。

![cos删除文件](delete_f.png)

#### 第七步：可以设置桶的配置（跨域访问、版本控制、生命周期、存储桶访问权限）
一、 私有读写

私有读写需要进行身份验证后才能对存储桶进行访问操作，私有读写是存储桶的默认访问权限，也是最安全的访问权限。
只有该存储桶的创建者及有授权的账号才对该存储桶中的对象有读写权限，其他任何人对该存储桶中的对象都没有读写权限。存储桶访问权限默认为私有读写，推荐使用。

二、公有读私有写

公有读私有写可对存储桶进行匿名读操作, 写操作需要进行身份验证。如果想要使用COS对象存储托管静态网站，选择“公有读私有写”权限。
任何人(包括匿名访问者)都对该存储桶的读权限，但只有存储桶创建者及有授权的账号才对该存储桶中的对象有写权限。

注意：
公有读权限可以通过匿名身份直接读取您存储桶中的数据，存在一定的安全风险，为确保您的数据安全，不推荐此配置，建议您选择私有。

三、公有读写

公有读写可对存储桶进行匿名读操作和写操作。

![cos存储桶配置](bucket_config.png)

#### 第七步：获取存储桶API密钥,和访问地址（目前只支持ssl）

![cos密钥](api_key.png)

## 5.2 SDK

### 5.2.1 JAVA

|包|地址|
|:-:|:-:|
|aws-sdk-java|https://github.com/aws/aws-sdk-java|

POM依赖项

```
        <dependency>
            <groupId>com.amazonaws</groupId>
            <artifactId>aws-java-sdk-s3</artifactId>
            <version>1.11.628</version>
        </dependency>
```

#### 5.2.1.1 HTTP

```java
package test;

import java.io.ByteArrayInputStream;
import java.io.File;
import java.util.List;

import com.amazonaws.AmazonServiceException;
import com.amazonaws.ClientConfiguration;
import com.amazonaws.Protocol;
import com.amazonaws.auth.AWSCredentials;
import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.client.builder.AwsClientBuilder.EndpointConfiguration;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.amazonaws.services.s3.model.Bucket;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.GeneratePresignedUrlRequest;
import com.amazonaws.services.s3.model.GetObjectRequest;
import com.amazonaws.services.s3.model.ObjectListing;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectResult;
import com.amazonaws.services.s3.model.S3ObjectSummary;
import com.amazonaws.services.s3.transfer.TransferManager;
import com.amazonaws.services.s3.transfer.TransferManagerBuilder;
import com.amazonaws.services.s3.transfer.Upload;
import com.amazonaws.util.StringUtils;

/**
 * S3Test
 */
public class S3Test {

    static String bucketName = "my-new-bucket";
    static String accessKey = "accessKey";
    static String secretKey = "secretKey";
    static String serviceEndpoint = "endpoint"; // e.g., "cos.gz-tst.cos.tg.unicom.local"
    static String region = "endpoint 第二个字段（区域简称）"; // e.g., "gz-tst"

    static AWSCredentials credentials = new BasicAWSCredentials(accessKey, secretKey);
    static AWSStaticCredentialsProvider awsStaticCredentialsProvider = new AWSStaticCredentialsProvider(credentials);
    static ClientConfiguration config = new ClientConfiguration();
    static EndpointConfiguration endpointConfiguration = new EndpointConfiguration(serviceEndpoint, region);
    static AmazonS3 conn = AmazonS3ClientBuilder.standard()
            .withCredentials(awsStaticCredentialsProvider)
            .withClientConfiguration(config.withProtocol(Protocol.HTTP).withSignerOverride("S3SignerType"))
            .withEndpointConfiguration(endpointConfiguration).build();

    public static String upload(String key, String content) {
        PutObjectResult result = conn.putObject(bucketName, key, content);
        return key;
    }

    public static void main(String[] args) {

        // 列出所有桶列表
        List<Bucket> buckets = conn.listBuckets();
        for (Bucket bucket : buckets) {
            System.out.println(bucket.getName() + "\t" + StringUtils.fromDate(bucket.getCreationDate()));
        }

        // 创建桶
        Bucket bucket = conn.createBucket("my-new-bucket");
        System.out.println(bucket.getName());

        // 列出桶内对象
        ObjectListing objects = conn.listObjects(bucket.getName());
        do {
            for (S3ObjectSummary objectSummary : objects.getObjectSummaries()) {
                System.out.println(objectSummary.getKey() + "\t" +
                        objectSummary.getSize() + "\t" +
                        StringUtils.fromDate(objectSummary.getLastModified()));
            }
            objects = conn.listNextBatchOfObjects(objects);
        } while (objects.isTruncated());

        // 创建对象
        ByteArrayInputStream input = new ByteArrayInputStream("Hello World!".getBytes());
        conn.putObject(bucket.getName(), "hello.txt", input, new ObjectMetadata());

        //分段上传
        String keyName = "xxx"; //文件上传成功后的文件名
        String filePath = "/xxx/xxx/xxx"; //文件路径
        TransferManager tm = TransferManagerBuilder.standard().withS3Client(conn).build();

        try {
            // TransferManager processes all transfers asynchronously,
            // so this call returns immediately.
            System.out.println("开始分片上传");
            Upload upload = tm.upload(bucketName, keyName, new File(filePath));

            //Optionally, wait for the upload to finish before continuing.
            upload.waitForCompletion();
            System.out.println("结束分片上传");
        } catch (AmazonServiceException | InterruptedException e) {
            // The call was transmitted successfully, but Amazon S3 couldn't process
            // it, so it returned an error response.
            e.printStackTrace();
        }

        // 修改对象的访问控制权限
        conn.setObjectAcl(bucket.getName(), "hello.txt", CannedAccessControlList.PublicRead);

        // 下载一个对象(到本地文件)
        conn.getObject(new GetObjectRequest(bucket.getName(), "hello.txt"), new File("./hello.txt"));

        // 生成对象下载链接（带签名）
        GeneratePresignedUrlRequest request = new GeneratePresignedUrlRequest(bucket.getName(), "hello.txt");
        System.out.println(conn.generatePresignedUrl(request));

        // 删除一个对象
        conn.deleteObject(bucket.getName(), "hello.txt");

        //删除桶
        conn.deleteBucket(bucket.getName());

    }
}
```

<!--- #### 5.2.1.2 HTTPS

需要将安全证书导入到JAVA的cacerts证书库

```java
package test;

import java.io.ByteArrayInputStream;
import java.io.File;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

import com.amazonaws.ClientConfiguration;
import com.amazonaws.Protocol;
import com.amazonaws.auth.AWSCredentials;
import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.client.builder.AwsClientBuilder.EndpointConfiguration;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.amazonaws.services.s3.model.Bucket;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.GeneratePresignedUrlRequest;
import com.amazonaws.services.s3.model.GetObjectRequest;
import com.amazonaws.services.s3.model.ObjectListing;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectResult;
import com.amazonaws.services.s3.model.S3ObjectSummary;
import com.amazonaws.services.s3.transfer.TransferManager;
import com.amazonaws.services.s3.transfer.TransferManagerBuilder;
import com.amazonaws.services.s3.transfer.Upload;
import com.amazonaws.util.StringUtils;

import org.joda.time.DateTime;

/**
 * S3HttpsTest
 */
public class S3HttpsTest {

    public static void main(String[] args) {

        static String bucketName = "my-new-bucket";
        static String accessKey = "accessKey";
        static String secretKey = "secretKey";
        static String serviceEndpoint = "endpoint";
        static String region = "endpoint 第二个字段（区域简称）";

        AWSCredentials credentials = new BasicAWSCredentials(accessKey, secretKey);
        AWSStaticCredentialsProvider awsStaticCredentialsProvider = new AWSStaticCredentialsProvider(credentials);
        EndpointConfiguration endpointConfiguration = new EndpointConfiguration(serviceEndpoint, region);
        AmazonS3 conn = AmazonS3ClientBuilder.standard()
                .withCredentials(awsStaticCredentialsProvider)
                .withSignerOverride("S3SignerType"))
                .withEndpointConfiguration(endpointConfiguration).build();

        // 列出所有桶列表
        List<Bucket> buckets = conn.listBuckets();
        for (Bucket bucket : buckets) {
            System.out.println(bucket.getName() + "\t" + StringUtils.fromDate(bucket.getCreationDate()));
        }

        // 创建桶
        Bucket bucket = conn.createBucket(bucketName);
        System.out.println(bucket.getName());

        // // 列出桶内对象
        ObjectListing objects = conn.listObjects(bucketName);
        do {
            for (S3ObjectSummary objectSummary : objects.getObjectSummaries()) {
                System.out.println(objectSummary.getKey() + "\t" + objectSummary.getSize() + "\t"
                        + StringUtils.fromDate(objectSummary.getLastModified()));
            }
            objects = conn.listNextBatchOfObjects(objects);
        } while (objects.isTruncated());

        // // 创建对象
        ByteArrayInputStream input = new ByteArrayInputStream("HelloWorld!".getBytes());
        conn.putObject(bucketName.getName(), "hello.txt", input, new ObjectMetadata());

        // // 修改对象的访问控制权限
        conn.setObjectAcl(bucketName.getName(), "hello.txt", CannedAccessControlList.PublicRead);

        // // 下载一个对象(到本地文件)
        conn.getObject(new GetObjectRequest(bucketName.getName(), "hello.txt"), new File("./hello.txt"));

        // // 上传对象
        System.out.println("开始上传");
        PutObjectResult res = conn.putObject(bucketName.getName(), "tg.png", new File("./tg.png"));
        System.out.println("结束上传");

        // 生成对象下载链接（带签名）
        GeneratePresignedUrlRequest request = new GeneratePresignedUrlRequest("picture", "tg.png");
        System.out.println(conn.generatePresignedUrl(request));

        // 删除一个对象
        conn.deleteObject(bucketName.getName(), "hello.txt");

        // 删除桶
        conn.deleteBucket(bucketName.getName());
    }
}
```
-->

### 5.2.2 python

|||
|:-:|:-:|
|环境|python3.6 boto==2.49.0|
|文档地址|http://boto.cloudhackers.com/en/latest/s3_tut.html|

#### 5.2.2.1 HTTP

```python
import boto
import boto.s3.connection


access_key = "你的access_key"
secret_key = "你的secretKey"

conn = boto.connect_s3(
    aws_access_key_id=access_key,
    aws_secret_access_key=secret_key,
    host='访问地址',
    is_secure=False,               # 是否开启ssl
    calling_format=boto.s3.connection.OrdinaryCallingFormat(),
)

# 列出用户拥有的桶列表
for bucket in conn.get_all_buckets():
    print("{name}\t{created}".format(name = bucket.name, created = bucket.creation_date))


# 创建桶
bucket = conn.create_bucket('your-new-bucket')

# 列出桶内容
for key in bucket.list():
    print("{name}\t{size}\t{modified}".format(name = key.name, size = key.size, modified = key.last_modified))


#创建一个对象
key = bucket.new_key('hello.txt')
key.set_contents_from_string('Hello World!')

#生成对象的下载链接
hello_key = bucket.get_key('hello.txt')
hello_url = hello_key.generate_url(3600, query_auth=True, force_http=False)
print(hello_url)

#修改一个对象的访问控制权限
hello_key = bucket.get_key('hello.txt')
hello_key.set_canned_acl('public-read')

#下载对象到文件中
key = bucket.get_key('hello.txt')
key.get_contents_to_filename('./hello.txt')

#删除一个对象
bucket.delete_key('hello.txt')

#删除存储桶
conn.delete_bucket(bucket.name)
```

<!--- ##### 5.2.2.2 HTTPS

```python
import boto
import boto.s3.connection
import ssl

try:
   _create_unverified_https_context = ssl._create_unverified_context
except AttributeError:
    pass
else:
    ssl._create_default_https_context = _create_unverified_https_context

access_key = "你的access_key"
secret_key = "你的secretKey"

conn = boto.connect_s3(
    aws_access_key_id=access_key,
    aws_secret_access_key=secret_key,
    host='访问地址',
    is_secure=True,               # 是否开启ssl
    calling_format=boto.s3.connection.OrdinaryCallingFormat(),
)

# 列出用户拥有的桶列表
for bucket in conn.get_all_buckets():
    print("{name}\t{created}".format(name = bucket.name, created = bucket.creation_date))


# 创建桶
bucket = conn.create_bucket('your-new-bucket')

# 列出桶内容
for key in bucket.list():
    print("{name}\t{size}\t{modified}".format(name = key.name, size = key.size, modified = key.last_modified))

#创建一个对象
key = bucket.new_key('hello.txt')
key.set_contents_from_string('Hello World!')

#生成对象的下载链接
hello_key = bucket.get_key('hello.txt')
hello_url = hello_key.generate_url(3600, query_auth=True, force_http=False)
print(hello_url)


#修改一个对象的访问控制权限
hello_key = bucket.get_key('hello.txt')
hello_key.set_canned_acl('public-read')

#下载对象到文件中
key = bucket.get_key('hello.txt')
key.get_contents_to_filename('./hello.txt')

#删除一个对象
bucket.delete_key('hello.txt')

#删除存储桶
conn.delete_bucket(bucket.name)
```
-->

### 5.2.3 JS

#### 5.2.3.1 JS

```
const AWS = require("aws-sdk");

var s3 = new AWS.S3({
  accessKeyId:'accesskey', //替换为自己的accesskey
  secretAccessKey:'secretkey', //替换为自己的secretkey
  endpoint: 'endpoint', //e.g., "cos.wx-tst.cos.tg.unicom.local"
  apiVersion: '2006-03-01',
  s3ForcePathStyle: true,
  sslEnabled: true,
});

const upload =  s3.upload({
            Bucket: 'my-new-bucket',//替换为自己的bucketname
            Key: key, //上传的对象的key
            Body: file, //上传的文件
            'ACL': 'public-read',
        },function (err,data){
          if (err){
            console.log(err,'err----')
          }else{
            console.log(data,'data---')
          }
        });
```



## 5.3 外部软件

windows: S3 Browser

![sb首页](sb首页.png)

![sb第一步](sb第一步.png)

![sb账户配置](sb账户配置.png)

![sb展示页](sb展示页.png)



## 5.4 Nginx配置

###  5.4.1 访问存储桶下所有静态文件

##### 模板

```

location /{匹配规则}/ {
        proxy_pass https://cos.{regionID}.cos.tg.unicom.local/{accountId}:{bucketName}/; 
}
```

##### 具体实例

```
location /cos/ {
        proxy_pass https://cos.gz-tst.cos.tg.unicom.local/110169999549:test/;
}
```





### 5.4.2 访问单独文件

##### 模板

```
location /{匹配规则} {
        proxy_pass https://cos.{regionID}.cos.tg.unicom.local/{accountId}:{bucketName}/{objectKey对象名}; #该链接为对象访问地址
}
```



##### 具体实例

```
location /cos/document {
        proxy_pass https://cos.gz-hqc.cos.tg.unicom.local/110169999549:test/stringobj; #该链接为对象访问地址
}
```


## 6.1 常见问题

###  6.1.1 域名解析
示例问题：pod不能解析cos域名，需要配置联通云的DNS地址

解决方案（k8s版本<=1.18）：

kubectl edit configmap coredns -n kube-system查看配置文件，修改这个配置文件，添加upstream和forward字段

![coreDNS配置](set_DNS2.png)

示例中10.125.138.224:1353 10.125.138.225:1353是西咸arm测试区的联通云DNS，可以根据需要修改（询问相关支撑人员）。
修改后重启生效。

解决方案（k8s版本>1.18）：

```
unicom.local:53 {
        errors
        cache 30
        forward . 10.172.49.5 10.172.49.6
    }
```



###  6.1.2 vpn资源组

![无法访问此网站](无法访问此网站.png)

联通办公网要访问COS产品，需要将VPN用户加入“cswr-天宫云平台-天宫门户-生产-租户”资源组。
