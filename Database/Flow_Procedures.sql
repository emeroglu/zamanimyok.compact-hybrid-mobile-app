DROP PROCEDURE Flow_Regenerate
DROP PROCEDURE Flow_Generate
DROP PROCEDURE Flow_Fill
DROP PROCEDURE Flow_Create
DROP PROCEDURE Flow_Remove
GO

CREATE PROCEDURE Flow_Remove
AS

	DROP TABLE flowImage
	DROP TABLE flowPhotoshoot
	DROP TABLE flowPhotoshootType
	DROP TABLE flowReservationDetail
	DROP TABLE flowReservationKey
	DROP TABLE flowReservation
	DROP TABLE flowState
	DROP TABLE flowRequestDetail
	DROP TABLE flowRequest
	DROP TABLE flowRequestKey
	DROP TABLE flowRequestState	

GO

CREATE PROCEDURE Flow_Create
AS

	CREATE TABLE flowRequestState
	(
		PK int primary key identity(0,1),
		Value varchar(50) NOT NULL,
		Extras varchar(MAX) NOT NULL,
		CreateDate datetime NOT NULL,
		CreatedBy varchar(250) NOT NULL,
		UpdateDate datetime NOT NULL,
		UpdatedBy varchar(250) NOT NULL,
		RemovalDate datetime NOT NULL,
		RemovedBy varchar(250) NOT NULL,
		Present bit NOT NULL
	)	

	CREATE TABLE flowRequestKey
	(
		PK int primary key identity(0,1),
		Value varchar(50) NOT NULL,
		Extras varchar(MAX) NOT NULL,
		CreateDate datetime NOT NULL,
		CreatedBy varchar(250) NOT NULL,
		UpdateDate datetime NOT NULL,
		UpdatedBy varchar(250) NOT NULL,
		RemovalDate datetime NOT NULL,
		RemovedBy varchar(250) NOT NULL,
		Present bit NOT NULL
	)	

	CREATE TABLE flowRequest
	(
		PK int primary key identity(0,1),
		InstanceFK int foreign key references authInstance(PK),
		UserFK int foreign key references userSelf(PK),
		AffiliateFK int foreign key references affSelf(PK),
		ServantFK int foreign key references serSelf(PK),
		ServiceFK int foreign key references affService(PK),
		StatusFK int foreign key references flowRequestState(PK),
		Extras varchar(MAX) NOT NULL,
		CreateDate datetime NOT NULL,
		CreatedBy varchar(250) NOT NULL,
		UpdateDate datetime NOT NULL,
		UpdatedBy varchar(250) NOT NULL,
		RemovalDate datetime NOT NULL,
		RemovedBy varchar(250) NOT NULL,
		Present bit NOT NULL
	)	

	CREATE TABLE flowRequestDetail
	(
		PK int primary key identity(0,1),
		RequestFK int foreign key references flowRequest(PK),
		KeyFK int foreign key references flowRequestKey(PK),
		Value varchar(MAX) NOT NULL,
		Extras varchar(MAX) NOT NULL,
		CreateDate datetime NOT NULL,
		CreatedBy varchar(250) NOT NULL,
		UpdateDate datetime NOT NULL,
		UpdatedBy varchar(250) NOT NULL,
		RemovalDate datetime NOT NULL,
		RemovedBy varchar(250) NOT NULL,
		Present bit NOT NULL
	)	

	CREATE TABLE flowState
	(
		PK int primary key identity(0,1),
		Value varchar(50) NOT NULL,
		Extras varchar(MAX) NOT NULL,
		CreateDate datetime NOT NULL,
		CreatedBy varchar(250) NOT NULL,
		UpdateDate datetime NOT NULL,
		UpdatedBy varchar(250) NOT NULL,
		RemovalDate datetime NOT NULL,
		RemovedBy varchar(250) NOT NULL,
		Present bit NOT NULL
	)	

	CREATE TABLE flowReservation
	(
		PK int primary key identity(0,1),
		RequestFK int foreign key references flowRequest(PK),
		StatusFK int foreign key references flowState(PK),
		Number varchar(6) NOT NULL,
		Extras varchar(MAX) NOT NULL,
		CreateDate datetime NOT NULL,
		CreatedBy varchar(250) NOT NULL,
		UpdateDate datetime NOT NULL,
		UpdatedBy varchar(250) NOT NULL,
		RemovalDate datetime NOT NULL,
		RemovedBy varchar(250) NOT NULL,
		Present bit NOT NULL
	)
	
	CREATE TABLE flowReservationKey
	(
		PK int primary key identity(0,1),
		Value varchar(50) NOT NULL,
		Extras varchar(MAX) NOT NULL,
		CreateDate datetime NOT NULL,
		CreatedBy varchar(250) NOT NULL,
		UpdateDate datetime NOT NULL,
		UpdatedBy varchar(250) NOT NULL,
		RemovalDate datetime NOT NULL,
		RemovedBy varchar(250) NOT NULL,
		Present bit NOT NULL
	)
	
	CREATE TABLE flowReservationDetail
	(
		PK int primary key identity(0,1),
		ReservationFK int foreign key references flowReservation(PK),
		KeyFK int foreign key references flowReservationKey(PK),
		Value varchar(50) NOT NULL,
		Extras varchar(MAX) NOT NULL,
		CreateDate datetime NOT NULL,
		CreatedBy varchar(250) NOT NULL,
		UpdateDate datetime NOT NULL,
		UpdatedBy varchar(250) NOT NULL,
		RemovalDate datetime NOT NULL,
		RemovedBy varchar(250) NOT NULL,
		Present bit NOT NULL
	)	

	CREATE TABLE flowPhotoshootType
	(
		PK int primary key identity(0,1),
		Value varchar(50) NOT NULL,
		Extras varchar(MAX) NOT NULL,
		CreateDate datetime NOT NULL,
		CreatedBy varchar(250) NOT NULL,
		UpdateDate datetime NOT NULL,
		UpdatedBy varchar(250) NOT NULL,
		RemovalDate datetime NOT NULL,
		RemovedBy varchar(250) NOT NULL,
		Present bit NOT NULL
	)	

	CREATE TABLE flowPhotoshoot
	(
		PK int primary key identity(0,1),
		ReservationFK int foreign key references flowReservation(PK),
		TypeFK int foreign key references flowPhotoshootType(PK),
		Extras varchar(MAX) NOT NULL,
		CreateDate datetime NOT NULL,
		CreatedBy varchar(250) NOT NULL,
		UpdateDate datetime NOT NULL,
		UpdatedBy varchar(250) NOT NULL,
		RemovalDate datetime NOT NULL,
		RemovedBy varchar(250) NOT NULL,
		Present bit NOT NULL
	)	

	CREATE TABLE flowImage
	(
		PK int primary key identity(0,1),
		PhotoshootFK int foreign key references flowPhotoshoot(PK),
		[Index] int NOT NULL,
		Label varchar(100) NOT NULL,
		Name varchar(250) NOT NULL,
		Url varchar(2500) NOT NULL,
		Extras varchar(MAX) NOT NULL,
		CreateDate datetime NOT NULL,
		CreatedBy varchar(250) NOT NULL,
		UpdateDate datetime NOT NULL,
		UpdatedBy varchar(250) NOT NULL,
		RemovalDate datetime NOT NULL,
		RemovedBy varchar(250) NOT NULL,
		Present bit NOT NULL
	)	

GO

CREATE PROCEDURE Flow_Fill
AS

	INSERT INTO flowRequestState VALUES ('NULL', 'NULL', GETDATE(), 'NULL', GETDATE(), 'NULL', GETDATE(), 'NULL', 0)
	INSERT INTO flowRequestKey VALUES ('NULL', 'NULL', GETDATE(), 'NULL', GETDATE(), 'NULL', GETDATE(), 'NULL', 0)
	INSERT INTO flowRequest VALUES (0, 0, 0, 0, 0, 0, 'NULL', GETDATE(), 'NULL', GETDATE(), 'NULL', GETDATE(), 'NULL', 0)
	INSERT INTO flowState VALUES ('NULL', 'NULL', GETDATE(), 'NULL', GETDATE(), 'NULL', GETDATE(), 'NULL', 0)
	INSERT INTO flowReservation VALUES (0, 0, 'NULL', 'NULL', GETDATE(), 'NULL', GETDATE(), 'NULL', GETDATE(), 'NULL', 0)
	INSERT INTO flowReservationKey VALUES ('NULL', 'NULL', GETDATE(), 'NULL', GETDATE(), 'NULL', GETDATE(), 'NULL', 0)
	INSERT INTO flowReservationDetail VALUES (0, 0, 'NULL', 'NULL', GETDATE(), 'NULL', GETDATE(), 'NULL', GETDATE(), 'NULL', 0)
	INSERT INTO flowPhotoshootType VALUES ('NULL', 'NULL', GETDATE(), 'NULL', GETDATE(), 'NULL', GETDATE(), 'NULL', 0)
	INSERT INTO flowPhotoshoot VALUES (0, 0, 'NULL', GETDATE(), 'NULL', GETDATE(), 'NULL', GETDATE(), 'NULL', 0)
	INSERT INTO flowImage VALUES (0, 0, 'NULL', 'NULL', 'NULL', 'NULL', GETDATE(), 'NULL', GETDATE(), 'NULL', GETDATE(), 'NULL', 0)

	INSERT INTO flowRequestKey VALUES ('UserVehicleFK', '', GETDATE(), '', GETDATE(), '', GETDATE(), '', 1)
	INSERT INTO flowRequestKey VALUES ('TakeOverAddressFK', '', GETDATE(), '', GETDATE(), '', GETDATE(), '', 1)
	INSERT INTO flowRequestKey VALUES ('DeliveryAddressFK', '', GETDATE(), '', GETDATE(), '', GETDATE(), '', 1)
	INSERT INTO flowRequestKey VALUES ('Note', '', GETDATE(), '', GETDATE(), '', GETDATE(), '', 1)

	INSERT INTO flowRequestState VALUES ('REQUESTED', '', GETDATE(), '', GETDATE(), '', GETDATE(), '', 1)
	INSERT INTO flowRequestState VALUES ('APPROVED', '', GETDATE(), '', GETDATE(), '', GETDATE(), '', 1)
	INSERT INTO flowRequestState VALUES ('REJECTED', '', GETDATE(), '', GETDATE(), '', GETDATE(), '', 1)

	INSERT INTO flowState VALUES ('REQUESTED', '', GETDATE(), '', GETDATE(), '', GETDATE(), '', 1)
	INSERT INTO flowState VALUES ('APPROVED', '', GETDATE(), '', GETDATE(), '', GETDATE(), '', 1)
	INSERT INTO flowState VALUES ('REJECTED', '', GETDATE(), '', GETDATE(), '', GETDATE(), '', 1)
	INSERT INTO flowState VALUES ('VALLET_ON_THE_WAY', '', GETDATE(), '', GETDATE(), '', GETDATE(), '', 1)
	INSERT INTO flowState VALUES ('VALLET_ARRIVED', '', GETDATE(), '', GETDATE(), '', GETDATE(), '', 1)
	--INSERT INTO flowState VALUES ('USER_PAID', '', GETDATE(), '', GETDATE(), '', GETDATE(), '', 1)
	--INSERT INTO flowState VALUES ('VALLET_RECEIVED', '', GETDATE(), '', GETDATE(), '', GETDATE(), '', 1)
	INSERT INTO flowState VALUES ('USER_HANDED_THE_KEY', '', GETDATE(), '', GETDATE(), '', GETDATE(), '', 1)
	INSERT INTO flowState VALUES ('VALLET_GOT_THE_KEY', '', GETDATE(), '', GETDATE(), '', GETDATE(), '', 1)
	INSERT INTO flowState VALUES ('VALLET_PERFORMED_THE_PHOTOSHOOT', '', GETDATE(), '', GETDATE(), '', GETDATE(), '', 1)
	INSERT INTO flowState VALUES ('VALLET_ON_THE_WAY_TO_AFFILIATE', '', GETDATE(), '', GETDATE(), '', GETDATE(), '', 1)
	INSERT INTO flowState VALUES ('VALLET_ARRIVED_TO_AFFILIATE', '', GETDATE(), '', GETDATE(), '', GETDATE(), '', 1)
	INSERT INTO flowState VALUES ('VEHICLE_IS_IN_PROCESS', '', GETDATE(), '', GETDATE(), '', GETDATE(), '', 1)
	INSERT INTO flowState VALUES ('VEHICLE_IS_DONE', '', GETDATE(), '', GETDATE(), '', GETDATE(), '', 1)
	INSERT INTO flowState VALUES ('VALLET_ON_THE_WAY_TO_USER', '', GETDATE(), '', GETDATE(), '', GETDATE(), '', 1)
	INSERT INTO flowState VALUES ('VALLET_ARRIVED_TO_USER', '', GETDATE(), '', GETDATE(), '', GETDATE(), '', 1)
	INSERT INTO flowState VALUES ('VALLET_PERFORMED_THE_DELIVERY_PHOTOSHOOT', '', GETDATE(), '', GETDATE(), '', GETDATE(), '', 1)
	INSERT INTO flowState VALUES ('VALLET_HANDED_THE_KEYS_BACK', '', GETDATE(), '', GETDATE(), '', GETDATE(), '', 1)
	INSERT INTO flowState VALUES ('USER_ENDED_THE_FLOW', '', GETDATE(), '', GETDATE(), '', GETDATE(), '', 1)	

	INSERT INTO flowReservationKey VALUES ('Fee', '', GETDATE(), '', GETDATE(), '', GETDATE(), '', 1)

	INSERT INTO flowPhotoshootType VALUES ('TAKE_OVER', '', GETDATE(), '', GETDATE(), '', GETDATE(), '', 1)
	INSERT INTO flowPhotoshootType VALUES ('DELIVERY', '', GETDATE(), '', GETDATE(), '', GETDATE(), '', 1)

GO

CREATE PROCEDURE Flow_Generate
AS

	EXEC Flow_Create
	EXEC Flow_Fill
	
GO

CREATE PROCEDURE Flow_Regenerate
AS

	EXEC Flow_Remove
	EXEC Flow_Generate

GO