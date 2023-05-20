export function validatePassword(password) {
    // Kiểm tra độ dài của mật khẩu
    if (password.length < 8 || password.length > 20) {
      return false;
    }
  
    // Kiểm tra xem mật khẩu có chứa ít nhất một ký tự chữ hoa
    if (!/[A-Z]/.test(password)) {
      return false;
    }
  
    // Kiểm tra xem mật khẩu có chứa ít nhất một ký tự chữ thường
    if (!/[a-z]/.test(password)) {
      return false;
    }
  
    // Kiểm tra xem mật khẩu có chứa ít nhất một ký tự số
    if (!/[0-9]/.test(password)) {
      return false;
    }
  
    // Kiểm tra xem mật khẩu có chứa ít nhất một ký tự đặc biệt
    if (!/[!@#$%^&*]/.test(password)) {
      return false;
    }
  
    // Nếu các điều kiện trên không thỏa mãn, mật khẩu được coi là hợp lệ
    return true;
  }