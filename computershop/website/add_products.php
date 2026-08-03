<?php
include 'include/connect.php';

$products = [
    [
        'pname' => 'Sample Headset 1',
        'category' => 'headset',
        'description' => 'A comfortable gaming headset',
        'price' => 120,
        'qtyavail' => 15,
        'img' => 'headset_sample.jpg',
        'brand' => 'Generic'
    ],
    [
        'pname' => 'Sample Gaming Chair 1',
        'category' => 'gaming chair',
        'description' => 'An ergonomic gaming chair',
        'price' => 250,
        'qtyavail' => 10,
        'img' => 'chair_sample.jpg',
        'brand' => 'Generic'
    ],
    [
        'pname' => 'Sample Mouse Pad 1',
        'category' => 'mouse pad',
        'description' => 'A large gaming mouse pad',
        'price' => 40,
        'qtyavail' => 30,
        'img' => 'mousepad_sample.jpg',
        'brand' => 'Generic'
    ],
    [
        'pname' => 'Sample Table 1',
        'category' => 'table',
        'description' => 'A sturdy gaming table',
        'price' => 350,
        'qtyavail' => 5,
        'img' => 'table_sample.jpg',
        'brand' => 'Generic'
    ]
];

foreach ($products as $product) {
    $pname = $product['pname'];
    $category = $product['category'];
    $description = $product['description'];
    $price = $product['price'];
    $qtyavail = $product['qtyavail'];
    $img = $product['img'];
    $brand = $product['brand'];

    $sql = "INSERT INTO products (pname, category, description, price, qtyavail, img, brand) VALUES ('$pname', '$category', '$description', $price, $qtyavail, '$img', '$brand')";

    if (mysqli_query($con, $sql)) {
        echo "New record created successfully for $pname<br>";
    } else {
        echo "Error: " . $sql . "<br>" . mysqli_error($con);
    }
}

mysqli_close($con);
?>
