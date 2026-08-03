USE project;

CREATE TABLE accounts (
  aid int(11) NOT NULL,
  afname varchar(100) NOT NULL,
  alname varchar(100) NOT NULL,
  phone char(11) NOT NULL,
  email varchar(100) NOT NULL,
  cnic char(13) NOT NULL,
  dob date NOT NULL,
  username varchar(100) NOT NULL,
  gender varchar(10) NOT NULL,
  password varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE cart (
  aid int(11) NOT NULL,
  pid int(11) NOT NULL,
  cqty int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `order-details` (
  oid int(11) NOT NULL,
  pid int(11) NOT NULL,
  qty int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE orders (
  oid int(11) NOT NULL,
  dateod date NOT NULL,
  datedel date DEFAULT NULL,
  aid int(11) NOT NULL,
  address varchar(255) NOT NULL,
  city varchar(50) NOT NULL,
  country varchar(100) NOT NULL,
  account char(16) DEFAULT NULL,
  total int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE products (
  pid int(11) NOT NULL,
  pname varchar(100) NOT NULL,
  category varchar(50) NOT NULL,
  description varchar(200) NOT NULL,
  price int(11) NOT NULL,
  qtyavail int(11) NOT NULL,
  img varchar(255) NOT NULL,
  brand varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE reviews (
  oid int(11) NOT NULL,
  pid int(11) NOT NULL,
  rtext varchar(1000) DEFAULT NULL,
  rating int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE wishlist (
  aid int(11) NOT NULL,
  pid int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
