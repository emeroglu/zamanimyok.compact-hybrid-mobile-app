DROP PROCEDURE Payment_Regenerate
DROP PROCEDURE Payment_Generate
DROP PROCEDURE Payment_Fill
DROP PROCEDURE Payment_Create
DROP PROCEDURE Payment_Remove
GO

CREATE PROCEDURE Payment_Remove
AS

	DROP TABLE payCard

GO

CREATE PROCEDURE Payment_Create
AS

	CREATE TABLE payCard
	(
		PK int primary key identity(0,1),
		MemberFK int foreign key references authMember(PK),
		Name varchar(1000) NOT NULL,
		FullName varchar(1000) NOT NULL,
		Number varchar(100) NOT NULL,
		ExpiryDate varchar(20) NOT NULL,
		CCV int NOT NULL,
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

CREATE PROCEDURE Payment_Fill
AS

	INSERT INTO payCard VALUES (0, 'NULL', 'NULL', 'NULL', 'NULL', 0, 'NULL', GETDATE(), 'NULL', GETDATE(), 'NULL', GETDATE(), 'NULL', 0)	

GO

CREATE PROCEDURE Payment_Generate
AS
	
	EXEC Payment_Create
	EXEC Payment_Fill

GO

CREATE PROCEDURE Payment_Regenerate
AS
	
	EXEC Payment_Remove
	EXEC Payment_Generate

GO
