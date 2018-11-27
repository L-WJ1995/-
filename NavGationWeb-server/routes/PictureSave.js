const multer = require('multer');
const fs = require('fs');

module.exports = function(){
                    const storage = multer.diskStorage({
                    destination: async function (req, file, cb) {
                        switch (req.body.type) {
                            case 'digitalCurrency':
                                cb(null, 'upload/digitalCurrency_icon');
                                if (req.body.upDataRow_status) {
                                    let path = await db.get(`SELECT icoPath FROM ${req.body.type} WHERE id = ${req.body.id - 0}`)
                                    fs.unlink('./' + path.icoPath, () => console.log('./' + path.icoPath + '已删除'))
                                }  
                                break;
                            case 'expert':
                                cb(null, 'upload/expert_img');
                                if (req.body.upDataRow_status) {
                                    let path = await db.get(`SELECT imgPath FROM ${req.body.type} WHERE id = ${req.body.id - 0}`)
                                    fs.unlink('./' + path.imgPath, () => console.log('./' + path.icoPath + '已删除'))
                                }                        
                                break;
                        }
                    },
                    filename: function (req, file, cb) {
                        // 将保存文件名设置为 时间戳 + 文件原始名，比如 151342376785-123.jpg
                        cb(null, Date.now() + "-" + file.originalname);  
                    }
                });

                // 创建文件夹
                const createFolder = function(folder){
                    try{
                        // 测试 path 指定的文件或目录的用户权限,我们用来检测文件是否存在
                        // 如果文件路径不存在将会抛出错误"no such file or directory"
                        fs.accessSync(folder); 
                    }catch(e){
                        // 文件夹不存在，以同步的方式创建文件目录。
                        fs.mkdirSync(folder);
                    }  
                };

                let uploadFolder = [
                                    './upload/',
                                    'upload/digitalCurrency_icon/',
                                    'upload/expert_img/',
                                    ];

                uploadFolder.forEach(item => createFolder(item))                    
                

                // 创建 multer 对象
                let upload = multer({ storage: storage });
                /* GET home page. */
                return upload
            }
