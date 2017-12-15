function userLogin() {
  var userName = document.mediaForm.username.value;
  var userPwd = document.mediaForm.password.value;
  var flag = true;
  if (userName === "") {
    alert("用户名不能为空");
    flag = false;
  } else if (userPwd === "") {
    alert("密码不能为空");
    flag = false;
  }
  if (flag) {
    document.mediaForm.submit();
  }
}
