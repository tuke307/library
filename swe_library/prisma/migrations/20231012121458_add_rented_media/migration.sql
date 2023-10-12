-- CreateTable
CREATE TABLE "RentedMedia" (
    "id" SERIAL NOT NULL,
    "mediaId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "rentedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "returnedAt" TIMESTAMP(3),

    CONSTRAINT "RentedMedia_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "RentedMedia" ADD CONSTRAINT "RentedMedia_mediaId_fkey" FOREIGN KEY ("mediaId") REFERENCES "Media"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RentedMedia" ADD CONSTRAINT "RentedMedia_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
