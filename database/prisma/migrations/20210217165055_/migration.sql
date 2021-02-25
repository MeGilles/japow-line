-- CreateTable
CREATE TABLE "RouteType" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "name_jp" TEXT,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AltitudeZone" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "name_jp" TEXT,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PointType" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "name_jp" TEXT,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Map_" (
    "id" SERIAL NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BarChart" (
    "id" SERIAL NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Location" (
    "id" SERIAL NOT NULL,
    "parentId" INTEGER,
    "name" TEXT NOT NULL,
    "name_jp" TEXT,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Route" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "name_jp" TEXT NOT NULL,
    "description" TEXT,
    "description_jp" TEXT,
    "elevationDifference" INTEGER,
    "maxAltitude" INTEGER,
    "minAltitude" INTEGER,
    "totalDistance" INTEGER,
    "elevationDistance" INTEGER,
    "decentDistance" INTEGER,
    "recomendedMonth" INTEGER[],
    "picturesPath" TEXT[],
    "routePoints" TEXT[],
    "locationId" INTEGER,
    "routeTypeId" INTEGER,
    "altitudeZoneId" INTEGER,
    "startPointTypeId" INTEGER,
    "endPointTypeId" INTEGER,
    "mapId" INTEGER,
    "barChartId" INTEGER,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Post" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" TEXT,
    "content" TEXT NOT NULL,
    "picturesPath" TEXT[],
    "routeId" INTEGER NOT NULL,
    "authorId" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "accounts" (
    "id" SERIAL NOT NULL,
    "compound_id" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL,
    "provider_type" TEXT NOT NULL,
    "provider_id" TEXT NOT NULL,
    "provider_account_id" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "access_token_expires" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sessions" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,
    "session_token" TEXT NOT NULL,
    "access_token" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "email_verified" TIMESTAMP(3),
    "image" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "verification_requests" (
    "id" SERIAL NOT NULL,
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
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
CREATE UNIQUE INDEX "Location.name_unique" ON "Location"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Location.name_jp_unique" ON "Location"("name_jp");

-- CreateIndex
CREATE UNIQUE INDEX "Route.name_unique" ON "Route"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Route.name_jp_unique" ON "Route"("name_jp");

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

-- AddForeignKey
ALTER TABLE "Location" ADD FOREIGN KEY ("parentId") REFERENCES "Location"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Route" ADD FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Route" ADD FOREIGN KEY ("routeTypeId") REFERENCES "RouteType"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Route" ADD FOREIGN KEY ("altitudeZoneId") REFERENCES "AltitudeZone"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Route" ADD FOREIGN KEY ("startPointTypeId") REFERENCES "PointType"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Route" ADD FOREIGN KEY ("endPointTypeId") REFERENCES "PointType"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Route" ADD FOREIGN KEY ("mapId") REFERENCES "Map_"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Route" ADD FOREIGN KEY ("barChartId") REFERENCES "BarChart"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD FOREIGN KEY ("routeId") REFERENCES "Route"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD FOREIGN KEY ("authorId") REFERENCES "accounts"("id") ON DELETE CASCADE ON UPDATE CASCADE;
