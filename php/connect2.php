<?php
if($_SERVER['REQUEST_METHOD']=='POST' && isset($_POST['submit']))
    {
        $conn = mysqli_connect('localhost','root','','musicclub') or die("Connection Failed");
        if(!$conn){
            echo "not";
        }
    }
$sql = mysqli_query($conn,"SELECT * FROM members WHERE email ='" . $_POST["email"] . "' AND password='" . $_POST["password"] . "'    ");
       
        $num = mysqli_num_rows($sql);
       
        if($num > 0) {
            echo '<script type="text/javascript">alert("Welcome");</script>'; 
            echo "Welome Back Fam";
        }
        else{
            echo "Invalid credentials/New User";
        }

?>
