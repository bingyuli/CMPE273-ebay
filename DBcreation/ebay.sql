-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';
SET SQL_SAFE_UPDATES = 0;

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mydb` DEFAULT CHARACTER SET utf8 ;
USE `mydb` ;

-- -----------------------------------------------------
-- Table `mydb`.`Person`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`Person` ;

CREATE TABLE IF NOT EXISTS `mydb`.`Person` (
  `Person_id` INT(11) NOT NULL AUTO_INCREMENT,
  `Person_first_name` VARCHAR(45) NULL DEFAULT NULL,
  `Person_last_name` VARCHAR(45) NULL DEFAULT NULL,
  `Person_zip` VARCHAR(45) NULL DEFAULT NULL,
  `Person_address` VARCHAR(100) NULL DEFAULT NULL,
  `Person_state` VARCHAR(45) NULL DEFAULT NULL,
  `Person_city` VARCHAR(45) NULL DEFAULT NULL,
  `Person_ssn` CHAR(9) NULL DEFAULT NULL,
  `Person_email` VARCHAR(45) NULL DEFAULT NULL,
  `Person_pass` VARCHAR(45) NULL DEFAULT NULL,
  `Person_buyActivate` TINYINT(1) NULL DEFAULT '1',
  `Person_sellActivate` TINYINT(1) NULL DEFAULT '1',
  PRIMARY KEY (`Person_id`),
  UNIQUE INDEX `Person_email_UNIQUE` (`Person_email` ASC),
  UNIQUE INDEX `Person_ssn_UNIQUE` (`Person_ssn` ASC))
ENGINE = InnoDB
AUTO_INCREMENT = 3
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `mydb`.`Seller`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`Seller` ;

CREATE TABLE IF NOT EXISTS `mydb`.`Seller` (
  `Seller_id` INT(11) NOT NULL,
  `Person_id` INT(11) NULL DEFAULT NULL,
  `Seller_rate` INT(11) NULL DEFAULT NULL,
  PRIMARY KEY (`Seller_id`),
  INDEX `fk_Seller_1_idx` (`Person_id` ASC),
  CONSTRAINT `fk_Seller_1`
    FOREIGN KEY (`Person_id`)
    REFERENCES `mydb`.`Person` (`Person_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 3
DEFAULT CHARACTER SET = utf8;

-- -----------------------------------------------------
-- Table `mydb`.`Shoppingcart`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`Shoppingcart` ;

CREATE TABLE IF NOT EXISTS `mydb`.`Shoppingcart` (
  `Item_id` INT(11) NOT NULL AUTO_INCREMENT,
  `Item_product_id` INT(11) NULL DEFAULT NULL,
  `Item_person_id` INT(11) NULL DEFAULT NULL,
  `Item_seller_id` INT(11) NULL DEFAULT NULL,
  PRIMARY KEY (`Item_id`),
  INDEX `fk_Shoppingcart_1_idx` (`Item_person_id` ASC),
  INDEX `fk_Shoppingcart_2_idx` (`Item_product_id` ASC),
  INDEX `fk_Shoppingcart_3_idx` (`Item_seller_id` ASC),
  CONSTRAINT `fk_Shoppingcart_1`
    FOREIGN KEY (`Item_person_id`)
    REFERENCES `mydb`.`Person` (`Person_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_Shoppingcart_2`
    FOREIGN KEY (`Item_product_id`)
    REFERENCES `mydb`.`Product` (`Product_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
    CONSTRAINT `fk_Shoppingcart_3`
    FOREIGN KEY (`Item_seller_id`)
    REFERENCES `mydb`.`Seller` (`Seller_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 3
DEFAULT CHARACTER SET = utf8;

-- -----------------------------------------------------
-- Table `mydb`.`Category`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`Category` ;

CREATE TABLE IF NOT EXISTS `mydb`.`Category` (
  `Category_id` INT(11) NOT NULL,
  `Category_name` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (`Category_id`))
ENGINE = InnoDB
AUTO_INCREMENT = 3
DEFAULT CHARACTER SET = utf8;
INSERT INTO Category (Category_id, Category_name) VALUES (1, 'Collectibles&Arts');
INSERT INTO Category (Category_id, Category_name) VALUES (2, 'Electronics');
INSERT INTO Category (Category_id, Category_name) VALUES (3, 'Entertainment');
INSERT INTO Category (Category_id, Category_name) VALUES (4, 'Fashion');
INSERT INTO Category (Category_id, Category_name) VALUES (5, 'Home&Garden');
INSERT INTO Category (Category_id, Category_name) VALUES (6, 'Motors');
INSERT INTO Category (Category_id, Category_name) VALUES (7, 'SportingGoods');
INSERT INTO Category (Category_id, Category_name) VALUES (8, 'Toys&Hobbies');
INSERT INTO Category (Category_id, Category_name) VALUES (9, 'Other');

-- -----------------------------------------------------
-- Table `mydb`.`Product`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`Product` ;

CREATE TABLE IF NOT EXISTS `mydb`.`Product` (
  `Product_id` INT(11) NOT NULL AUTO_INCREMENT,
  `Product_name` VARCHAR(45) NULL DEFAULT NULL,
  `Product_category_id` INT(11) NULL DEFAULT NULL,
  `Product_price` float NULL DEFAULT NULL,
  `Product_condition` TINYINT(1) NULL DEFAULT '0',
  `Product_type` TINYINT(1) NULL DEFAULT '0' COMMENT 'condition is new/used\ntype is bid/sell',
  `Product_seller_id` INT(11) NULL DEFAULT NULL,
  `Product_info` VARCHAR(45) NULL DEFAULT NULL,
  `Product_quantity` INT(11) NULL DEFAULT NULL,
  `Product_bid_start_price` DOUBLE NULL DEFAULT NULL,
  `Product_bid_start_time` DATETIME NULL DEFAULT NULL,
  `Product_bid_end_time` DATETIME NULL DEFAULT NULL,
  `Product_bid_end` TINYINT(1) NULL DEFAULT '0',
  `Product_img` VARCHAR(1000) NULL DEFAULT NULL,
  PRIMARY KEY (`Product_id`),
  INDEX `fk_Product_1_idx` (`Product_seller_id` ASC),
  INDEX `fk_Product_2_idx` (`Product_category_id` ASC),
  CONSTRAINT `fk_Product_1`
    FOREIGN KEY (`Product_seller_id`)
    REFERENCES `mydb`.`Seller` (`Seller_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_Product_2`
    FOREIGN KEY (`Product_category_id`)
    REFERENCES `mydb`.`Category` (`Category_id`)
    ON DELETE SET NULL
    ON UPDATE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 4
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `mydb`.`Customer`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`Customer` ;

CREATE TABLE IF NOT EXISTS `mydb`.`Customer` (
  `Customer_id` INT(11) NOT NULL,
  `Person_id` INT(11) NULL DEFAULT NULL,
  PRIMARY KEY (`Customer_id`),
  INDEX `fk_Buyer_1_idx` (`Person_id` ASC),
  CONSTRAINT `fk_Buyer_1`
    FOREIGN KEY (`Person_id`)
    REFERENCES `mydb`.`Person` (`Person_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 3
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `mydb`.`Bid`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`Bid` ;

CREATE TABLE IF NOT EXISTS `mydb`.`Bid` (
  `Bid_product_id` INT(11) NULL DEFAULT NULL,
  `Bid_id` INT(11) NOT NULL AUTO_INCREMENT,
  `Bid_customer_id` INT(11) NULL DEFAULT NULL,
  `Bid_price` DOUBLE NULL DEFAULT NULL,
  `Bid_time` DATETIME NULL DEFAULT NULL,
  PRIMARY KEY (`Bid_id`),
  INDEX `fk_Bid_1_idx` (`Bid_product_id` ASC),
  INDEX `fk_Bid_2_idx` (`Bid_customer_id` ASC),
  CONSTRAINT `fk_Bid_1`
    FOREIGN KEY (`Bid_product_id`)
    REFERENCES `mydb`.`Product` (`Product_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Bid_2`
    FOREIGN KEY (`Bid_customer_id`)
    REFERENCES `mydb`.`Customer` (`Customer_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 6
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `mydb`.`TransHistory`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`TransHistory` ;

CREATE TABLE IF NOT EXISTS `mydb`.`TransHistory` (
  `TransHistory_id` INT(11) NOT NULL AUTO_INCREMENT,
  `TransHistory_Buyer_id` INT(11) NULL DEFAULT NULL,
  `TransHistory_Seller_id` INT(11) NULL DEFAULT NULL,
  `TransHistory_Product_id` INT(11) NULL DEFAULT NULL,
  `TransHistory_time` TIMESTAMP NULL DEFAULT NULL,
  `TransHistory_type` CHAR(1) NULL DEFAULT NULL,
  `TransHistory_rate` DOUBLE(2,1) NULL DEFAULT '0.0',
  PRIMARY KEY (`TransHistory_id`),
  INDEX `fk_TransHistory_1_idx` (`TransHistory_Buyer_id` ASC),
  INDEX `fk_TransHistory_2_idx` (`TransHistory_Seller_id` ASC),
  INDEX `fk_TransHistory_3_idx` (`TransHistory_Product_id` ASC),
  CONSTRAINT `fk_TransHistory_1`
    FOREIGN KEY (`TransHistory_Buyer_id`)
    REFERENCES `mydb`.`Customer` (`Customer_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_TransHistory_2`
    FOREIGN KEY (`TransHistory_Seller_id`)
    REFERENCES `mydb`.`Seller` (`Seller_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_TransHistory_3`
    FOREIGN KEY (`TransHistory_Product_id`)
    REFERENCES `mydb`.`Product` (`Product_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 6
DEFAULT CHARACTER SET = utf8;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
USE `mydb`;

DELIMITER $$

USE `mydb`$$
DROP TRIGGER IF EXISTS `mydb`.`Person_AFTER_INSERT` $$
USE `mydb`$$
CREATE
DEFINER=`root`@`localhost`
TRIGGER `mydb`.`Person_AFTER_INSERT`
AFTER INSERT ON `mydb`.`Person`
FOR EACH ROW
BEGIN 
    INSERT INTO Seller (Seller_id, Person_id, Seller_rate) VALUES (New.Person_ssn, NEW.Person_id, 0);
    INSERT INTO Customer(Customer_id,Person_id) VALUES (NEW.Person_ssn,NEW.Person_id);
    END$$


/*
USE `mydb`$$
DROP TRIGGER IF EXISTS `mydb`.`TransHistory_AFTER_INSERT` $$
USE `mydb`$$
CREATE
DEFINER=`root`@`localhost`
TRIGGER `mydb`.`TransHistory_AFTER_INSERT`
AFTER INSERT ON `mydb`.`TransHistory`
FOR EACH ROW
BEGIN
	IF (SELECT Product_quantity FROM Product WHERE Product_id = NEW.TransHistory_Product_id)>0 THEN
    UPDATE Product SET Product_quantity= Product_quantity-1 WHERE Product_id = NEW.TransHistory_Product_id;
    ELSE
    INSERT INTO xxxx VALUES(1);
    END IF;
    END$$
    */

USE `mydb`$$
DROP TRIGGER IF EXISTS `mydb`.`TransHistory_AFTER_UPDATE` $$
USE `mydb`$$
CREATE 
DEFINER =`root`@`localhost`
TRIGGER `mydb`.`TransHistory_AFTER_UPDATE` 
AFTER UPDATE ON `TransHistory` 
FOR EACH ROW
    BEGIN 
    UPDATE Seller Set Seller.Seller_rate = (SELECT AVG(TransHistory.TransHistory_rate) FROM TransHistory
    WHERE TransHistory.TransHistory_Seller_id= NEW.TransHistory_Seller_id) WHERE Seller.Seller_id = NEW.TransHistory_Seller_id;
    END$$

USE `mydb`$$
DROP TRIGGER IF EXISTS `mydb`.`TransHistory_BEFORE_INSERT` $$
USE `mydb`$$
CREATE
DEFINER=`root`@`localhost`
TRIGGER `mydb`.`TransHistory_BEFORE_INSERT`
BEFORE INSERT ON `mydb`.`TransHistory`
FOR EACH ROW
BEGIN 
    IF NOT EXISTS (SELECT * FROM Product WHERE Product_id = NEW.TransHistory_Product_id AND Product_quantity>0) THEN
        INSERT INTO xxx VALUES(1);
        END IF;
        END$$



USE `mydb` $$
CREATE 
	EVENT `Auction_end` 
	ON SCHEDULE EVERY 1 MINUTE STARTS '2014-12-05 14:57:00' 
	DO BEGIN
		        -- Insert into transHistory of recently finished auction
		INSERT INTO mydb.TransHistory (TransHistory_Buyer_id, TransHistory_Seller_id, TransHistory_Product_id, TransHistory_time, TransHistory_type)
        SELECT Bid_customer_id, Product_seller_id, Product_id, Bid_time, '1'  FROM mydb.Product, mydb.Bid WHERE Product_bid_end_time<now() AND Product_bid_end =0 
					AND Product_id = Bid_Product_id AND (Bid_product_id, Bid_price) IN (SELECT Bid_product_id, Max(Bid_price) FROM mydb.Bid GROUP BY Bid_product_id);
        
        CREATE TABLE test AS
        SELECT Product_id FROM mydb.Product, mydb.Bid WHERE Product_bid_end_time<now() AND Product_bid_end =0 
			   AND Product_id = Bid_Product_id AND (Bid_product_id, Bid_price) IN (SELECT Bid_product_id, Max(Bid_price) FROM mydb.Bid GROUP BY Bid_product_id);
        UPDATE mydb.Product SET Product_quantity = Product_quantity-1 WHERE Product_id in (SELECT Product_id FROM test);
        DROP TABLE test;
           
		-- change the Bid_end flag
        UPDATE mydb.Product SET Product_bid_end = 1 WHERE Product_bid_end_time < now() AND Product_bid_end = 0;  
                    
	END $$

DELIMITER ;
