DROP PROCEDURE Auth_Regenerate
DROP PROCEDURE Auth_Generate
DROP PROCEDURE Auth_Fill
DROP PROCEDURE Auth_Create
DROP PROCEDURE Auth_Remove
GO

CREATE PROCEDURE Auth_Remove
AS

	DROP TABLE authOtp
	DROP TABLE authInstance
	DROP TABLE authInstanceState
	DROP TABLE authLoginDetail
	DROP TABLE authLoginKey
	DROP TABLE authLogin
	DROP TABLE authLoginState
	DROP TABLE authMemberDevice
	DROP TABLE authDevice
	DROP TABLE authModel
	DROP TABLE authOS
	DROP TABLE authUseragent
	DROP TABLE authScreen
	DROP TABLE authCredentialDetail
	DROP TABLE authCredentialKey
	DROP TABLE authCredential
	DROP TABLE authMember
	DROP TABLE authRole

GO

CREATE PROCEDURE Auth_Create
AS

	CREATE TABLE authRole
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

	CREATE TABLE authMember
	(
		PK int primary key identity(0,1),
		RoleFK int foreign key references authRole(PK),		
		Extras varchar(MAX) NOT NULL,
		CreateDate datetime NOT NULL,
		CreatedBy varchar(250) NOT NULL,
		UpdateDate datetime NOT NULL,
		UpdatedBy varchar(250) NOT NULL,
		RemovalDate datetime NOT NULL,
		RemovedBy varchar(250) NOT NULL,
		Present bit NOT NULL
	)	

	CREATE TABLE authCredential
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

	CREATE TABLE authCredentialKey
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

	CREATE TABLE authCredentialDetail
	(
		PK int primary key identity(0,1),
		CredentialFK int foreign key references authCredential(PK),
		KeyFK int foreign key references authCredentialKey(PK),
		Value varchar(1000) NOT NULL,
		Extras varchar(MAX) NOT NULL,
		CreateDate datetime NOT NULL,
		CreatedBy varchar(250) NOT NULL,
		UpdateDate datetime NOT NULL,
		UpdatedBy varchar(250) NOT NULL,
		RemovalDate datetime NOT NULL,
		RemovedBy varchar(250) NOT NULL,
		Present bit NOT NULL
	)	

	CREATE TABLE authScreen
	(
		PK int primary key identity(0,1),	
		Name varchar(1000) NOT NULL,
		Width int NOT NULL,
		Height int NOT NULL,
		AspectRatio varchar(7) NOT NULL,
		DiagonalInch varchar(5) NOT NULL,
		DiagonalCm varchar(5) NOT NULL,
		PPI int NOT NULL,
		PPC int NOT NULL,
		PixelRatio varchar(5) NOT NULL,
		Extras varchar(MAX) NOT NULL,
		CreateDate datetime NOT NULL,
		CreatedBy varchar(250) NOT NULL,
		UpdateDate datetime NOT NULL,
		UpdatedBy varchar(250) NOT NULL,
		RemovalDate datetime NOT NULL,
		RemovedBy varchar(250) NOT NULL,
		Present bit NOT NULL
	)	

	CREATE TABLE authUseragent
	(
		PK int primary key identity(0,1),
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

	CREATE TABLE authOS
	(
		PK int primary key identity(0,1),
		Value varchar(250) NOT NULL,
		Mobile bit NOT NULL,
		Desktop bit NOT NULL,
		Extras varchar(MAX) NOT NULL,
		CreateDate datetime NOT NULL,
		CreatedBy varchar(250) NOT NULL,
		UpdateDate datetime NOT NULL,
		UpdatedBy varchar(250) NOT NULL,
		RemovalDate datetime NOT NULL,
		RemovedBy varchar(250) NOT NULL,
		Present bit NOT NULL
	)	

	CREATE TABLE authModel
	(
		PK int primary key identity(0,1),
		Name varchar(500) NOT NULL,
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

	CREATE TABLE authDevice
	(
		PK int primary key identity(0,1),
		ScreenFK int foreign key references authScreen(PK),
		UseragentFK int foreign key references authUseragent(PK),
		OSFK int foreign key references authOS(PK),
		Extras varchar(MAX) NOT NULL,
		CreateDate datetime NOT NULL,
		CreatedBy varchar(250) NOT NULL,
		UpdateDate datetime NOT NULL,
		UpdatedBy varchar(250) NOT NULL,
		RemovalDate datetime NOT NULL,
		RemovedBy varchar(250) NOT NULL,
		Present bit NOT NULL
	)	

	CREATE TABLE authMemberDevice
	(
		PK int primary key identity(0,1),
		MemberFK int foreign key references authMember(PK),
		DeviceFK int foreign key references authDevice(PK),
		[Key] varchar(1000) NOT NULL,
		Extras varchar(MAX) NOT NULL,
		CreateDate datetime NOT NULL,
		CreatedBy varchar(250) NOT NULL,
		UpdateDate datetime NOT NULL,
		UpdatedBy varchar(250) NOT NULL,
		RemovalDate datetime NOT NULL,
		RemovedBy varchar(250) NOT NULL,
		Present bit NOT NULL
	)

	CREATE TABLE authLoginState
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

	CREATE TABLE authLogin
	(
		PK int primary key identity(0,1),
		DeviceFK int foreign key references authDevice(PK),
		StatusFK int foreign key references authLoginState(PK),
		Extras varchar(MAX) NOT NULL,
		CreateDate datetime NOT NULL,
		CreatedBy varchar(250) NOT NULL,
		UpdateDate datetime NOT NULL,
		UpdatedBy varchar(250) NOT NULL,
		RemovalDate datetime NOT NULL,
		RemovedBy varchar(250) NOT NULL,
		Present bit NOT NULL
	)	

	CREATE TABLE authLoginKey
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

	CREATE TABLE authLoginDetail
	(
		PK int primary key identity(0,1),
		LoginFK int foreign key references authLogin(PK),
		KeyFK int foreign key references authLoginKey(PK),
		Value varchar(1500) NOT NULL,
		Extras varchar(MAX) NOT NULL,
		CreateDate datetime NOT NULL,
		CreatedBy varchar(250) NOT NULL,
		UpdateDate datetime NOT NULL,
		UpdatedBy varchar(250) NOT NULL,
		RemovalDate datetime NOT NULL,
		RemovedBy varchar(250) NOT NULL,
		Present bit NOT NULL
	)	

	CREATE TABLE authInstanceState
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

	CREATE TABLE authInstance
	(
		PK int primary key identity(0,1),
		LoginFK int foreign key references authLogin(PK),
		MemberFK int foreign key references authMember(PK),
		StatusFK int foreign key references authInstanceState(PK),
		[Key] varchar(1000) NOT NULL,
		Extras varchar(MAX) NOT NULL,
		CreateDate datetime NOT NULL,
		CreatedBy varchar(250) NOT NULL,
		UpdateDate datetime NOT NULL,
		UpdatedBy varchar(250) NOT NULL,
		RemovalDate datetime NOT NULL,
		RemovedBy varchar(250) NOT NULL,
		Present bit NOT NULL
	)

	CREATE TABLE authOtp
	(
		PK int primary key identity(0,1),	
		[Key] varchar(1500) NOT NULL,
		Value varchar(1000) NOT NULL,
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

CREATE PROCEDURE Auth_Fill
AS

	INSERT INTO authRole VALUES ('NULL', 'NULL', GETDATE(), 'NULL', GETDATE(), 'NULL', GETDATE(), 'NULL', 0)
	INSERT INTO authMember VALUES (0, 'NULL', GETDATE(), 'NULL', GETDATE(), 'NULL', GETDATE(), 'NULL', 0)
	INSERT INTO authCredential VALUES (0, 'NULL', GETDATE(), 'NULL', GETDATE(), 'NULL', GETDATE(), 'NULL', 0)
	INSERT INTO authCredentialKey VALUES ('NULL', 'NULL', GETDATE(), 'NULL', GETDATE(), 'NULL', GETDATE(), 'NULL', 0)
	INSERT INTO authCredentialDetail VALUES (0, 0, 'NULL', 'NULL', GETDATE(), 'NULL', GETDATE(), 'NULL', GETDATE(), 'NULL', 0)
	INSERT INTO authScreen VALUES (0, 0, 0, 'NULL', 'NULL', 'NULL', 0, 0, 'NULL', 'NULL', GETDATE(), 'NULL', GETDATE(), 'NULL', GETDATE(), 'NULL', 0)
	INSERT INTO authUseragent VALUES ('NULL', 'NULL', GETDATE(), 'NULL', GETDATE(), 'NULL', GETDATE(), 'NULL', 0)
	INSERT INTO authOS VALUES ('NULL', 0, 0, 'NULL', GETDATE(), 'NULL', GETDATE(), 'NULL', GETDATE(), 'NULL', 0)
	INSERT INTO authModel VALUES ('NULL','NULL', 'NULL', GETDATE(), 'NULL', GETDATE(), 'NULL', GETDATE(), 'NULL', 0)
	INSERT INTO authDevice VALUES (0, 0, 0, 'NULL', GETDATE(), 'NULL', GETDATE(), 'NULL', GETDATE(), 'NULL', 0)
	INSERT INTO authMemberDevice VALUES (0, 0, 'NULL', 'NULL', GETDATE(), 'NULL', GETDATE(), 'NULL', GETDATE(), 'NULL', 0)
	INSERT INTO authLoginState VALUES ('NULL', 'NULL', GETDATE(), 'NULL', GETDATE(), 'NULL', GETDATE(), 'NULL', 0)
	INSERT INTO authLogin VALUES (0, 0, 'NULL', GETDATE(), 'NULL', GETDATE(), 'NULL', GETDATE(), 'NULL', 0)
	INSERT INTO authLoginKey VALUES ('NULL', 'NULL', GETDATE(), 'NULL', GETDATE(), 'NULL', GETDATE(), 'NULL', 0)
	INSERT INTO authLoginDetail VALUES (0, 0, 'NULL', 'NULL', GETDATE(), 'NULL', GETDATE(), 'NULL', GETDATE(), 'NULL', 0)
	INSERT INTO authInstanceState VALUES ('NULL', 'NULL', GETDATE(), 'NULL', GETDATE(), 'NULL', GETDATE(), 'NULL', 0)
	INSERT INTO authInstance VALUES (0, 0, 0, 'NULL', 'NULL', GETDATE(), 'NULL', GETDATE(), 'NULL', GETDATE(), 'NULL', 0)
	INSERT INTO authOtp VALUES ('NULL', 'NULL', 'NULL', GETDATE(), 'NULL', GETDATE(), 'NULL', GETDATE(), 'NULL', 0)

	INSERT INTO authRole VALUES ('USER', '', GETDATE(), '', GETDATE(), 'DB', GETDATE(), '', 1)
	INSERT INTO authRole VALUES ('MANAGER', '', GETDATE(), '', GETDATE(), 'DB', GETDATE(), '', 1)
	INSERT INTO authRole VALUES ('SERVANT', '', GETDATE(), '', GETDATE(), 'DB', GETDATE(), '', 1)

	INSERT INTO authCredentialKey VALUES ('Username', '', GETDATE(), 'DB', GETDATE(), '', GETDATE(), '', 1)
	INSERT INTO authCredentialKey VALUES ('Email', '', GETDATE(), 'DB', GETDATE(), '', GETDATE(), '', 1)
	INSERT INTO authCredentialKey VALUES ('Password', '', GETDATE(), 'DB', GETDATE(), '', GETDATE(), '', 1)

	INSERT INTO authLoginState VALUES ('SUCCESS', '', GETDATE(), 'DB', GETDATE(), '', GETDATE(), '', 1)
	INSERT INTO authLoginState VALUES ('FAIL', '', GETDATE(), 'DB', GETDATE(), '', GETDATE(), '', 1)

	INSERT INTO authLoginKey VALUES ('Username', '', GETDATE(), 'DB', GETDATE(), '', GETDATE(), '', 1)
	INSERT INTO authLoginKey VALUES ('Password', '', GETDATE(), 'DB', GETDATE(), '', GETDATE(), '', 1)

	INSERT INTO authInstanceState VALUES ('ACTIVE', '', GETDATE(), 'DB', GETDATE(), '', GETDATE(), '', 1)
	INSERT INTO authInstanceState VALUES ('EXPIRED', '', GETDATE(), 'DB', GETDATE(), '', GETDATE(), '', 1)
	INSERT INTO authInstanceState VALUES ('OVERRIDEN', '', GETDATE(), 'DB', GETDATE(), '', GETDATE(), '', 1)
	INSERT INTO authInstanceState VALUES ('CLOSED', '', GETDATE(), 'DB', GETDATE(), '', GETDATE(), '', 1)

GO

CREATE PROCEDURE Auth_Generate
AS

	EXEC Auth_Create
	EXEC Auth_Fill
	
GO

CREATE PROCEDURE Auth_Regenerate
AS

	EXEC Auth_Remove GO
	EXEC Auth_Generate GO

GO