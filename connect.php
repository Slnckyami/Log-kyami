<!-- proses-login.php -->
<?php
$username = $_POST['username'];
$password = $_POST['password'];

if($username == 'admin' && $password == '12345'){
    header('Location: connecta/index.html ');
    exit();
} else {
    echo "Username atau password salah";
}
?>
