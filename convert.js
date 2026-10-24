const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, 'public');

// Hàm quét tất cả các file trong thư mục public
function processDirectory(directory) {
  fs.readdirSync(directory).forEach(file => {
    const fullPath = path.join(directory, file);
    
    // Nếu là thư mục con thì quét tiếp
    if (fs.statSync(fullPath).isDirectory()) {
      processDirectory(fullPath);
    } 
    // Nếu là file hình ảnh (.png, .jpg, .jpeg)
    else if (file.match(/\.(png|jpg|jpeg)$/i)) {
      const outputPath = fullPath.replace(/\.(png|jpg|jpeg)$/i, '.webp');

      sharp(fullPath)
        // Giới hạn chiều ngang tối đa 1920px (nếu ảnh nhỏ hơn sẽ không bị phóng to)
        .resize({ width: 1920, withoutEnlargement: true }) 
        // Đổi sang WebP, nén chất lượng còn 80% (tối ưu dung lượng tốt nhất)
        .webp({ quality: 80, effort: 6 }) 
        .toFile(outputPath)
        .then(() => {
          console.log(`✅ Thành công: ${file} -> .webp`);
          // Xóa 2 dấu gạch chéo ở dòng dưới nếu anh muốn tự động xóa file JPG/PNG cũ sau khi chuyển xong
          // fs.unlinkSync(fullPath); 
        })
        .catch(err => console.error(`❌ Lỗi file ${file}:`, err));
    }
  });
}

console.log("🚀 Bắt đầu nén và chuyển đổi ảnh sang WebP...");
processDirectory(publicDir);
