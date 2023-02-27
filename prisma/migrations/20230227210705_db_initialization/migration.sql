-- CreateTable
CREATE TABLE `Brand` (
    `id` VARCHAR(191) NOT NULL,
    `brandName` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Brand_id_key`(`id`),
    UNIQUE INDEX `Brand_brandName_key`(`brandName`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Product` (
    `id` VARCHAR(191) NOT NULL,
    `productName` VARCHAR(191) NOT NULL,
    `price` INTEGER NOT NULL,
    `stock` INTEGER NOT NULL,
    `brandId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Product_id_key`(`id`),
    UNIQUE INDEX `Product_productName_key`(`productName`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `InnerTube` (
    `id` VARCHAR(191) NOT NULL,
    `diameter` INTEGER NOT NULL,
    `width` INTEGER NOT NULL,
    `productId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `InnerTube_id_key`(`id`),
    UNIQUE INDEX `InnerTube_productId_key`(`productId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Tire` (
    `id` VARCHAR(191) NOT NULL,
    `diameter` INTEGER NOT NULL,
    `width` INTEGER NOT NULL,
    `productId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Tire_id_key`(`id`),
    UNIQUE INDEX `Tire_productId_key`(`productId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Order` (
    `id` VARCHAR(191) NOT NULL,
    `date` DATETIME(3) NOT NULL,
    `items` JSON NOT NULL,
    `total` INTEGER NOT NULL,

    UNIQUE INDEX `Order_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_brandId_fkey` FOREIGN KEY (`brandId`) REFERENCES `Brand`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `InnerTube` ADD CONSTRAINT `InnerTube_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Tire` ADD CONSTRAINT `Tire_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
