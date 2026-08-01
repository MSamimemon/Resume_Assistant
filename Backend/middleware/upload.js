    const multer=require('multer');
    const path = require('path');


    const storage = multer.diskStorage({ // destination : multer where should i save file , cb (call back) : to the uploads folder
        destination: function(req, file , cb){
            cb(null , "uploads/");
        },
        filename:function(req, file , cb){
            const uniquefileName= Date.now()+ path.extname(file.originalname);
            cb(null,uniquefileName);
        }
    });
    const fileFilter=(req, file , cb)=>{
        const allowedpath=[".pdf",".doc",".docx"];
        const ext= path.extname(file.originalname).toLowerCase();
        if (allowedpath.includes(ext)){
            return cb(null , true)
        }else {
            cb(new Error("Wrong File Format Only Accept pdf , doc , docx Files"))
        }
    };
    const upload = multer({
        storage,fileFilter,limits:{fileSize: 50*1024*1024}
    });
    module.exports=upload;