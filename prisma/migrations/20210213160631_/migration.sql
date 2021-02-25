-- CreateTable
CREATE TABLE "RouteType" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "name_jp" TEXT
);

-- CreateTable
CREATE TABLE "AltitudeZone" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "name_jp" TEXT
);

-- CreateTable
CREATE TABLE "PointType" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "name_jp" TEXT
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
CREATE TABLE "Mountain" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "name_jp" TEXT
);

-- CreateTable
CREATE TABLE "Route" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "mountainId" INTEGER NOT NULL,
    "routeTypeId" INTEGER NOT NULL,
    "altitudeZoneId" INTEGER,
    "startPointTypeId" INTEGER,
    "mapId" INTEGER,
    "barChartId" INTEGER,
    "routeName" TEXT NOT NULL,
    "routeName_jp" TEXT,
    "routeDescription" TEXT NOT NULL,
    "routeDescription_jp" TEXT,
    "elevationDifference" INTEGER NOT NULL,
    "maxAltitude" INTEGER NOT NULL,
    "minAltitude" INTEGER NOT NULL,
    "totalDistance" INTEGER NOT NULL,
    "elevationDistance" INTEGER NOT NULL,
    "decentDistance" INTEGER NOT NULL,
    FOREIGN KEY ("mountainId") REFERENCES "Mountain" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY ("routeTypeId") REFERENCES "RouteType" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY ("altitudeZoneId") REFERENCES "AltitudeZone" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    FOREIGN KEY ("startPointTypeId") REFERENCES "PointType" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    FOREIGN KEY ("mapId") REFERENCES "Map_" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    FOREIGN KEY ("barChartId") REFERENCES "BarChart" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Post" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "title" TEXT,
    "content" TEXT NOT NULL,
    "authorId" INTEGER NOT NULL,
    FOREIGN KEY ("authorId") REFERENCES "accounts" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "accounts" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "compound_id" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL,
    "provider_type" TEXT NOT NULL,
    "provider_id" TEXT NOT NULL,
    "provider_account_id" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "access_token_expires" DATETIME,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "sessions" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "user_id" INTEGER NOT NULL,
    "expires" DATETIME NOT NULL,
    "session_token" TEXT NOT NULL,
    "access_token" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "users" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT,
    "email" TEXT,
    "email_verified" DATETIME,
    "image" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "verification_requests" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" DATETIME NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "RouteType.name_unique" ON "RouteType"("name");

-- CreateIndex
CREATE UNIQUE INDEX "RouteType.name_jp_unique" ON "RouteType"("name_jp");

-- CreateIndex
CREATE UNIQUE INDEX "AltitudeZone.name_unique" ON "AltitudeZone"("name");

-- CreateIndex
CREATE UNIQUE INDEX "AltitudeZone.name_jp_unique" ON "AltitudeZone"("name_jp");

-- CreateIndex
CREATE UNIQUE INDEX "PointType.name_unique" ON "PointType"("name");

-- CreateIndex
CREATE UNIQUE INDEX "PointType.name_jp_unique" ON "PointType"("name_jp");

-- CreateIndex
CREATE UNIQUE INDEX "Mountain.name_unique" ON "Mountain"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Mountain.name_jp_unique" ON "Mountain"("name_jp");

-- CreateIndex
CREATE UNIQUE INDEX "Route.mapId_unique" ON "Route"("mapId");

-- CreateIndex
CREATE UNIQUE INDEX "Route.barChartId_unique" ON "Route"("barChartId");

-- CreateIndex
CREATE UNIQUE INDEX "Route.routeName_unique" ON "Route"("routeName");

-- CreateIndex
CREATE UNIQUE INDEX "Route.routeName_jp_unique" ON "Route"("routeName_jp");

-- CreateIndex
CREATE UNIQUE INDEX "accounts.compound_id_unique" ON "accounts"("compound_id");

-- CreateIndex
CREATE INDEX "providerAccountId" ON "accounts"("provider_account_id");

-- CreateIndex
CREATE INDEX "providerId" ON "accounts"("provider_id");

-- CreateIndex
CREATE INDEX "userId" ON "accounts"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "sessions.session_token_unique" ON "sessions"("session_token");

-- CreateIndex
CREATE UNIQUE INDEX "sessions.access_token_unique" ON "sessions"("access_token");

-- CreateIndex
CREATE UNIQUE INDEX "users.email_unique" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "verification_requests.token_unique" ON "verification_requests"("token");
