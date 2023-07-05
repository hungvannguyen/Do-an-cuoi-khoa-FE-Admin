import React from "react";

const hasPermission = (user, allowedRoles) => {
    return allowedRoles.includes(user);
  };
  
  const withAuthorization = ({ user, allowedRoles, children }) => {
    // Kiểm tra xem vai trò của người dùng có trong danh sách vai trò được phép không
    const userHasPermission = hasPermission(user, allowedRoles);
  
    if (userHasPermission) {
      // Hiển thị nội dung cho người dùng có quyền truy cập
      return <>{children}</>;
    } else {
      // Hiển thị thông báo hoặc điều hướng đến trang lỗi quyền truy cập
      return <p>access denied</p>;
    }
  };

export default withAuthorization;