DROP PROCEDURE Servant_Regenerate
DROP PROCEDURE Servant_Generate
DROP PROCEDURE Servant_Fill
DROP PROCEDURE Servant_Create
DROP PROCEDURE Servant_Remove
GO

CREATE PROCEDURE Servant_Remove
AS

	DROP TABLE serDetail
	DROP TABLE serKey
	DROP TABLE serSelf	

GO

CREATE PROCEDURE Servant_Create
AS

	CREATE TABLE serSelf
	(
		PK int primary key identity(0,1),
		MemberFK int foreign key references authMember(PK),
		AffiliateFK int foreign key references affSelf(PK),	
		Extras varchar(MAX) NOT NULL,
		CreateDate datetime NOT NULL,
		CreatedBy varchar(250) NOT NULL,
		UpdateDate datetime NOT NULL,
		UpdatedBy varchar(250) NOT NULL,
		RemovalDate datetime NOT NULL,
		RemovedBy varchar(250) NOT NULL,
		Present bit NOT NULL
	)	

	CREATE TABLE serKey
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

	CREATE TABLE serDetail
	(
		PK int primary key identity(0,1),
		ServantFK int foreign key references serSelf(PK),
		KeyFK int foreign key references serKey(PK),
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

CREATE PROCEDURE Servant_Fill
AS

	INSERT INTO serSelf VALUES (0, 0, 'NULL', GETDATE(), 'NULL', GETDATE(), 'NULL', GETDATE(), 'NULL', 0)
	INSERT INTO serKey VALUES ('NULL', 'NULL', GETDATE(), 'NULL', GETDATE(), 'NULL', GETDATE(), 'NULL', 0)
	INSERT INTO serDetail VALUES (0, 0, 'NULL', 'NULL', GETDATE(), 'NULL', GETDATE(), 'NULL', GETDATE(), 'NULL', 0)	

	INSERT INTO serKey VALUES ('Name', '', GETDATE(), 'DB', GETDATE(), '', GETDATE(), '', 1)
	INSERT INTO serKey VALUES ('Email', '', GETDATE(), 'DB', GETDATE(), '', GETDATE(), '', 1)
	INSERT INTO serKey VALUES ('Phone', '', GETDATE(), 'DB', GETDATE(), '', GETDATE(), '', 1)
	INSERT INTO serKey VALUES ('Photo', '', GETDATE(), 'DB', GETDATE(), '', GETDATE(), '', 1)

GO


CREATE PROCEDURE Servant_Generate
AS

	EXEC Servant_Create
	EXEC Servant_Fill
	
GO

CREATE PROCEDURE Servant_Regenerate
AS

	EXEC Servant_Remove
	EXEC Servant_Generate

GO