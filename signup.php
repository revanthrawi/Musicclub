<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Create your account</title>
    <link rel="icon" href="https://0.s3.envato.com/files/195083621/tf-logo-2.png" type="image/x-icon">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <link rel="stylesheet" href="./styles/signup_login.css">
    <style>
        p{
            text-align : center;
        }
    </style>
</head>
<body>
    <div class="section">
        <div class="container">
            <div class="form">
                <div class="left-side">
                    <div class="content">
                        <h5 class="glow-on-hover">Dawg! Enter Fourth World Music</h5>
                        <img src="./assets/images/main_logo.png" style="background-color: rgb(78 65 65);padding: 7%;border-radius: 60px;">
                    </div>
                    <div class="social">
                        <ul class="social-icons">
                            <li><a href="#"><i class="fa fa-facebook"></i></a></li>
                            <li><a href="#"><i class="fa fa-twitter"></i></a></li>
                            <li><a href="#"><i class="fa fa-linkedin"></i></a></li>
                            <li><a href="#"><i class="fa fa-instagram"></i></a></li>
                        </ul>
                        <ul class="terms">
                            <li><a href="#">Terms</a></li>
                            <li><span class="dots"></span></li>
                            <li><a href="#">Services</a></li>
                        </ul>
                    </div>
                </div>
                <div class="right-side">
                    <form action="php/connect.php" name = "myf" method="POST">
                    <div class="forms">
                        <div class = "form-inputs">
                        <input type="text" class="form-inputs" id="fname" name="fname" maxsize ="10" size = "10" placeholder="First name" required>
                    <input type="text" class ="form-inputs" id="lname" name="lname" maxsize ="10" size = "10" placeholder="Last name" required>
                           </div>
                    <p class="error" style="color: red; text-decoration: underline;"></p>
                    <input type="date" class="form-control form-control-lg" id="dob" name="dob" placeholder="DD-MM-YYYY" required>
                    <input type="varchar" class="form-control form-control-lg" id="mobile" name="mobile" minlength="10" placeholder="Mobile number" required>
                    <p class="error" style="color: red; text-decoration: underline;"></p>
                        <div class="form-inputs"> <input type="text" name="username" placeholder="User name" required> <i class="fa fa-user"></i>
                        </div>
                        <div class="form-inputs"> <input type="email" name="email" placeholder="Email" required>
                            <i class="fa fa-envelope"></i> </div>
                        <div class="form-inputs"> <input type="password" id="password_input" name="password" class="password-input" placeholder="Password" required>
                            <i class="fa fa-eye" id="password_eye"></i>
                            <p id="random_password" style="color: #e8f0fe;"  class="random_password"></p>
                        </div>
                        <ul class="strength-list">
                            <li> <span class="loweruppercase list-group"> <i class="fa fa-circle"></i> <span>Lowercase uppercase</span>
                                </span> </li>
                            <li> <span class="list-group numbercase"> <i class="fa fa-circle"></i> <span>Number (0-9)</span>
                                </span> </li>
                            <li> <span class="list-group specialcase"> <i class="fa fa-circle"></i> <span>Special Characters(!#@$%*)</span>
                                </span> </li>
                            <li> <span class="list-group numcharacter"> <i class="fa fa-circle"></i> <span>8 Characters</span>
                                </span> </li>
                        </ul>
                        <div class="submit-button"> <input type="submit" value="Sign up" name="submit"> </div>
                    
                        <div class="form-inputs"><input type = "button" onclick="location.href='login.php'" value = "or Click here to Login"></div>
                    </div>
                </form>
                </div>
            </div>
        </div>
</div>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
    <script src="scripts/signup.js"></script>
</body>
</html>