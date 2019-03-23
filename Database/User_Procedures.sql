DROP PROCEDURE User_Regenerate
DROP PROCEDURE User_Generate
DROP PROCEDURE User_Fill
DROP PROCEDURE User_Create
DROP PROCEDURE User_Remove
GO

CREATE PROCEDURE User_Remove
AS

	DROP TABLE userVehicleDetail
	DROP TABLE userVehicle
	DROP TABLE userAddress
	DROP TABLE userDetail
	DROP TABLE userKey
	DROP TABLE userSelf	

GO

CREATE PROCEDURE User_Create
AS

	CREATE TABLE userSelf
	(
		PK int primary key identity(0,1),
		MemberFK int foreign key references authMember(PK),	
		Extras varchar(MAX) NOT NULL,
		CreateDate datetime NOT NULL,
		CreatedBy varchar(250) NOT NULL,
		UpdateDate datetime NOT NULL,
		UpdatedBy varchar(250) NOT NULL,
		RemovalDate datetime NOT NULL,
		RemovedBy varchar(250) NOT NULL,
		Present bit NOT NULL
	)	

	CREATE TABLE userKey
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

	CREATE TABLE userDetail
	(
		PK int primary key identity(0,1),
		UserFK int foreign key references userSelf(PK),
		KeyFK int foreign key references userKey(PK),
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

	CREATE TABLE userAddress
	(
		PK int primary key identity(0,1),
		UserFK int foreign key references userSelf(PK),	
		Name varchar(1000) NOT NULL,	
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

	CREATE TABLE userVehicle
	(
		PK int primary key identity(0,1),
		UserFK int foreign key references userSelf(PK),
		VehicleFK int foreign key references vhcSelf(PK),	
		Extras varchar(MAX) NOT NULL,
		CreateDate datetime NOT NULL,
		CreatedBy varchar(250) NOT NULL,
		UpdateDate datetime NOT NULL,
		UpdatedBy varchar(250) NOT NULL,
		RemovalDate datetime NOT NULL,
		RemovedBy varchar(250) NOT NULL,
		Present bit NOT NULL
	)

	CREATE TABLE userVehicleDetail
	(
		PK int primary key identity(0,1),
		UserVehicleFK int foreign key references userVehicle(PK),
		KeyFK int foreign key references vhcKey(PK),
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

GO

CREATE PROCEDURE User_Fill
AS

	INSERT INTO userSelf VALUES (0, 'NULL', GETDATE(), 'NULL', GETDATE(), 'NULL', GETDATE(), 'NULL', 0)
	INSERT INTO userKey VALUES ('NULL', 'NULL', GETDATE(), 'NULL', GETDATE(), 'NULL', GETDATE(), 'NULL', 0)
	INSERT INTO userDetail VALUES (0, 0, 'NULL', 'NULL', GETDATE(), 'NULL', GETDATE(), 'NULL', GETDATE(), 'NULL', 0)
	INSERT INTO userAddress VALUES (0, 'NULL', 'NULL', 'NULL', GETDATE(), 'NULL', GETDATE(), 'NULL', GETDATE(), 'NULL', 0)
	INSERT INTO userVehicle VALUES (0, 0, 'NULL', GETDATE(), 'NULL', GETDATE(), 'NULL', GETDATE(), 'NULL', 0)
	INSERT INTO userVehicleDetail VALUES (0, 0, 'NULL', 'NULL', GETDATE(), 'NULL', GETDATE(), 'NULL', GETDATE(), 'NULL', 0)

	INSERT INTO userKey VALUES ('Name', '', GETDATE(), 'DB', GETDATE(), '', GETDATE(), '', 1)
	INSERT INTO userKey VALUES ('Email', '', GETDATE(), 'DB', GETDATE(), '', GETDATE(), '', 1)
	INSERT INTO userKey VALUES ('Phone', '', GETDATE(), 'DB', GETDATE(), '', GETDATE(), '', 1)

GO


CREATE PROCEDURE User_Generate
AS

	EXEC User_Create
	EXEC User_Fill
	
GO

CREATE PROCEDURE User_Regenerate
AS

	EXEC User_Remove
	EXEC User_Generate

GO