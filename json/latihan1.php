<?php 

// $mahasiswa = [
//    [
//     "nama" => " Tari Dwi Syafitri",
//     "nip"  => "2217020084",
//     "email" => "taridwisyafitri@gmail.com"
//    ],
//    [ 
//    "nama" => " Tari Hartono",
//     "nip"  => "2217020085",
//     "email" => "tarihartono@gmail.com"
//    ]
// ];

$dbh = new PDO ('mysql:host=localhost;dbname=phpdasar','root',
'');
$db = $dbh -> prepare('SELECT * FROM mahasiswa');
$db->execute();
$mahasiswa = $db->fetchAll (PDO::FETCH_ASSOC); //ngambil data dari database


$data =json_encode ($mahasiswa);
echo $data;

?>