<?php
if($_SERVER['REQUEST_METHOD']=='POST' && isset($_POST['submit']))
    {
        $conn = mysqli_connect('localhost','root','','musicclub') or die("Connection Failed");

        if(isset($_POST['fname']) && isset($_POST['lname']) && isset($_POST['username']) && isset($_POST['dob']) && isset($_POST['email']) && isset($_POST['mobile']) && isset($_POST['password']))
        {
            $fname = $_POST['fname'];
            $lname = $_POST['lname'];
            $dob = $_POST['dob'];
            $mobile = $_POST['mobile'];
            $username = $_POST['username'];
            $email = $_POST['email'];
            $password = $_POST['password'];
            $sql1 = mysqli_query($conn,"SELECT * FROM members WHERE email ='" . $_POST["email"] . "' AND username='" . $_POST["username"] . "'    ");
            $num = mysqli_num_rows($sql1);
            if($num<=0)
            {
                $sql = "INSERT INTO `members` (`fname`, `lname`, `username`, `dob`, `email`, `mobile`, `password`)  VALUES ('$fname','$lname','$username','$dob','$email','$mobile','$password')";
                mysqli_query($conn,$sql);
                echo '<script type="text/javascript">alert("Welcome New User");</script>'."<br>";
                echo "Entry Successfull"."<br>";
            }
            else if($num > 0) {
                echo '<script type="text/javascript">alert("User Already registered! Please Go To Login Page")</script>';
            
            }
            else
            {
                echo "Error Occured";
            }  
        }
    }
?>