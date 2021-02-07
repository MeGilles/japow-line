-- CreateTable
CREATE TABLE "Mountain" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "RouteType" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "AltitudeZone" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "PointType" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Map_" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT
);

-- CreateTable
CREATE TABLE "BarChart" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT
);

-- CreateTable
CREATE TABLE "Route" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "mountainId" INTEGER NOT NULL,
    "routeTypeId" INTEGER NOT NULL,
    "altitudeZoneId" INTEGER NOT NULL,
    "startPointTypeId" INTEGER NOT NULL,
    "mapId" INTEGER NOT NULL,
    "barChartId" INTEGER NOT NULL,
    "routePoints" TEXT NOT NULL,
    "routeDescription" TEXT NOT NULL,
    "elevationDifference" INTEGER NOT NULL,
    "maxAltitude" INTEGER NOT NULL,
    "minAltitude" INTEGER NOT NULL,
    "totalDistance" INTEGER NOT NULL,
    "elevationDistance" INTEGER NOT NULL,
    "decentDistance" INTEGER NOT NULL,
    FOREIGN KEY ("mountainId") REFERENCES "Mountain" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY ("routeTypeId") REFERENCES "RouteType" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY ("altitudeZoneId") REFERENCES "AltitudeZone" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY ("startPointTypeId") REFERENCES "PointType" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY ("mapId") REFERENCES "Map_" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY ("barChartId") REFERENCES "BarChart" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Post" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "content" TEXT NOT NULL,
    "authorId" INTEGER NOT NULL,
    FOREIGN KEY ("authorId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "name" TEXT
);

-- CreateIndex
CREATE UNIQUE INDEX "Mountain.name_unique" ON "Mountain"("name");

-- CreateIndex
CREATE UNIQUE INDEX "RouteType.name_unique" ON "RouteType"("name");

-- CreateIndex
CREATE UNIQUE INDEX "AltitudeZone.name_unique" ON "AltitudeZone"("name");

-- CreateIndex
CREATE UNIQUE INDEX "PointType.name_unique" ON "PointType"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Route.mapId_unique" ON "Route"("mapId");

-- CreateIndex
CREATE UNIQUE INDEX "Route.barChartId_unique" ON "Route"("barChartId");

-- CreateIndex
CREATE UNIQUE INDEX "User.email_unique" ON "User"("email");
