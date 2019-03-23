DROP PROCEDURE Affiliate_Regenerate
DROP PROCEDURE Affiliate_Generate
DROP PROCEDURE Affiliate_Fill
DROP PROCEDURE Affiliate_Create
DROP PROCEDURE Affiliate_Remove
GO

CREATE PROCEDURE Affiliate_Remove
AS
	
	DROP TABLE affPricingDetail
	DROP TABLE affPricingKey
	DROP TABLE affPricing
	DROP TABLE affService
	DROP TABLE affMemberDetail
	DROP TABLE affMemberKey
	DROP TABLE affMember
	DROP TABLE affDetail
	DROP TABLE affKey
	DROP TABLE affSelf
	DROP TABLE affLocation
	DROP TABLE affDistrict
	DROP TABLE affCity
	DROP TABLE affFranchise	

GO

CREATE PROCEDURE Affiliate_Create
AS

	CREATE TABLE affFranchise
	(
		PK int primary key identity(0,1),
		Name varchar(1000) NOT NULL,
		Extras varchar(MAX) NOT NULL,
		CreateDate datetime NOT NULL,
		CreatedBy varchar(250) NOT NULL,
		UpdateDate datetime NOT NULL,
		UpdatedBy varchar(250) NOT NULL,
		RemovalDate datetime NOT NULL,
		RemovedBy varchar(250) NOT NULL,
		Present bit NOT NULL
	)	

	CREATE TABLE affCity
	(
		PK int primary key identity(0,1),
		Name varchar(100) NOT NULL,
		Extras varchar(MAX) NOT NULL,
		CreateDate datetime NOT NULL,
		CreatedBy varchar(250) NOT NULL,
		UpdateDate datetime NOT NULL,
		UpdatedBy varchar(250) NOT NULL,
		RemovalDate datetime NOT NULL,
		RemovedBy varchar(250) NOT NULL,
		Present bit NOT NULL
	)	

	CREATE TABLE affDistrict
	(
		PK int primary key identity(0,1),
		CityFK int foreign key references affCity(PK),
		Name varchar(250) NOT NULL,
		Extras varchar(MAX) NOT NULL,
		CreateDate datetime NOT NULL,
		CreatedBy varchar(250) NOT NULL,
		UpdateDate datetime NOT NULL,
		UpdatedBy varchar(250) NOT NULL,
		RemovalDate datetime NOT NULL,
		RemovedBy varchar(250) NOT NULL,
		Present bit NOT NULL
	)	

	CREATE TABLE affLocation
	(
		PK int primary key identity(0,1),
		CityFK int foreign key references affCity(PK),
		DistrictFK int foreign key references affDistrict(PK),
		Latitude varchar(50) NOT NULL,
		Longitude varchar(50) NOT NULL,
		[Address] varchar(2500) NOT NULL,
		Extras varchar(MAX) NOT NULL,
		CreateDate datetime NOT NULL,
		CreatedBy varchar(250) NOT NULL,
		UpdateDate datetime NOT NULL,
		UpdatedBy varchar(250) NOT NULL,
		RemovalDate datetime NOT NULL,
		RemovedBy varchar(250) NOT NULL,
		Present bit NOT NULL
	)	

	CREATE TABLE affSelf
	(
		PK int primary key identity(0,1),
		FranchiseFK int foreign key references affFranchise(PK),
		LocationFK int foreign key references affLocation(PK),
		Name varchar(1000) NOT NULL,
		Extras varchar(MAX) NOT NULL,
		CreateDate datetime NOT NULL,
		CreatedBy varchar(250) NOT NULL,
		UpdateDate datetime NOT NULL,
		UpdatedBy varchar(250) NOT NULL,
		RemovalDate datetime NOT NULL,
		RemovedBy varchar(250) NOT NULL,
		Present bit NOT NULL
	)	

	CREATE TABLE affKey
	(
		PK int primary key identity(0,1),
		Value varchar(100) NOT NULL,
		Extras varchar(MAX) NOT NULL,
		CreateDate datetime NOT NULL,
		CreatedBy varchar(250) NOT NULL,
		UpdateDate datetime NOT NULL,
		UpdatedBy varchar(250) NOT NULL,
		RemovalDate datetime NOT NULL,
		RemovedBy varchar(250) NOT NULL,
		Present bit NOT NULL
	)	

	CREATE TABLE affDetail
	(
		PK int primary key identity(0,1),
		AffiliateFK int foreign key references affSelf(PK),
		KeyFK int foreign key references affKey(PK),
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

	CREATE TABLE affMember
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

	CREATE TABLE affMemberKey
	(
		PK int primary key identity(0,1),
		MemberFK int foreign key references affMember(PK),
		Value varchar(100) NOT NULL,
		Extras varchar(MAX) NOT NULL,
		CreateDate datetime NOT NULL,
		CreatedBy varchar(250) NOT NULL,
		UpdateDate datetime NOT NULL,
		UpdatedBy varchar(250) NOT NULL,
		RemovalDate datetime NOT NULL,
		RemovedBy varchar(250) NOT NULL,
		Present bit NOT NULL
	)	

	CREATE TABLE affMemberDetail
	(
		PK int primary key identity(0,1),
		MemberFK int foreign key references affMember(PK),
		KeyFK int foreign key references affMemberKey(PK),
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

	CREATE TABLE affService
	(
		PK int primary key identity(0,1),
		AffiliateFK int foreign key references affSelf(PK),		
		Name varchar(1000) NOT NULL,
		Extras varchar(MAX) NOT NULL,
		CreateDate datetime NOT NULL,
		CreatedBy varchar(250) NOT NULL,
		UpdateDate datetime NOT NULL,
		UpdatedBy varchar(250) NOT NULL,
		RemovalDate datetime NOT NULL,
		RemovedBy varchar(250) NOT NULL,
		Present bit NOT NULL
	)

	CREATE TABLE affPricing
	(
		PK int primary key identity(0,1),
		ServiceFK int foreign key references affService(PK),
		Extras varchar(MAX) NOT NULL,
		CreateDate datetime NOT NULL,
		CreatedBy varchar(250) NOT NULL,
		UpdateDate datetime NOT NULL,
		UpdatedBy varchar(250) NOT NULL,
		RemovalDate datetime NOT NULL,
		RemovedBy varchar(250) NOT NULL,
		Present bit NOT NULL
	)	

	CREATE TABLE affPricingKey
	(
		PK int primary key identity(0,1),
		Value varchar(100) NOT NULL,
		Extras varchar(MAX) NOT NULL,
		CreateDate datetime NOT NULL,
		CreatedBy varchar(250) NOT NULL,
		UpdateDate datetime NOT NULL,
		UpdatedBy varchar(250) NOT NULL,
		RemovalDate datetime NOT NULL,
		RemovedBy varchar(250) NOT NULL,
		Present bit NOT NULL
	)	

	CREATE TABLE affPricingDetail
	(
		PK int primary key identity(0,1),
		PricingFK int foreign key references affPricing(PK),
		KeyFK int foreign key references affPricingKey(PK),
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

CREATE PROCEDURE Affiliate_Fill
AS

	INSERT INTO affFranchise VALUES ('NULL', 'NULL', GETDATE(), 'NULL', GETDATE(), 'NULL', GETDATE(), 'NULL', 0)
	INSERT INTO affCity VALUES ('NULL', 'NULL', GETDATE(), 'NULL', GETDATE(), 'NULL', GETDATE(), 'NULL', 0)
	INSERT INTO affDistrict VALUES (0, 'NULL', 'NULL', GETDATE(), 'NULL', GETDATE(), 'NULL', GETDATE(), 'NULL', 0)
	INSERT INTO affLocation VALUES (0, 0, 'NULL', 'NULL', 'NULL', 'NULL', GETDATE(), 'NULL', GETDATE(), 'NULL', GETDATE(), 'NULL', 0)
	INSERT INTO affSelf VALUES (0, 0, 'NULL', 'NULL', GETDATE(), 'NULL', GETDATE(), 'NULL', GETDATE(), 'NULL', 0)
	INSERT INTO affKey VALUES ('NULL', 'NULL', GETDATE(), 'NULL', GETDATE(), 'NULL', GETDATE(), 'NULL', 0)
	INSERT INTO affDetail VALUES (0, 0, 'NULL', 'NULL', GETDATE(), 'NULL', GETDATE(), 'NULL', GETDATE(), 'NULL', 0)
	INSERT INTO affMember VALUES (0, 0, 'NULL', GETDATE(), 'NULL', GETDATE(), 'NULL', GETDATE(), 'NULL', 0)
	INSERT INTO affMemberKey VALUES (0, 'NULL', 'NULL', GETDATE(), 'NULL', GETDATE(), 'NULL', GETDATE(), 'NULL', 0)
	INSERT INTO affMemberDetail VALUES (0, 0, 'NULL', 'NULL', GETDATE(), 'NULL', GETDATE(), 'NULL', GETDATE(), 'NULL', 0)
	INSERT INTO affService VALUES (0, 'NULL', 'NULL', GETDATE(), 'NULL', GETDATE(), 'NULL', GETDATE(), 'NULL', 0)
	INSERT INTO affPricing VALUES (0, 'NULL', GETDATE(), 'NULL', GETDATE(), 'NULL', GETDATE(), 'NULL', 0)
	INSERT INTO affPricingKey VALUES ('NULL', 'NULL', GETDATE(), 'NULL', GETDATE(), 'NULL', GETDATE(), 'NULL', 0)
	INSERT INTO affPricingDetail VALUES (0, 0, 'NULL', 'NULL', GETDATE(), 'NULL', GETDATE(), 'NULL', GETDATE(), 'NULL', 0)	

	INSERT INTO affKey VALUES ('Icon', '', GETDATE(), 'DB', GETDATE(), '', GETDATE(), '', 1)	

	INSERT INTO affPricingKey VALUES ('Average', '', GETDATE(), 'DB', GETDATE(), '', GETDATE(), '', 1)


GO

CREATE PROCEDURE Affiliate_Generate
AS

	EXEC Affiliate_Create
	EXEC Affiliate_Fill

GO

CREATE PROCEDURE Affiliate_Regenerate
AS

	EXEC Affiliate_Remove
	EXEC Affiliate_Generate

GO