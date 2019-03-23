DROP TABLE logHttp
DROP TABLE logResponse
DROP TABLE logResponseType
DROP TABLE logRequest
DROP TABLE logRequestType
DROP TABLE logLocation
DROP TABLE logCity
DROP TABLE logRegion
DROP TABLE logCountry
DROP TABLE logException
DROP TABLE logInteractionDetail
DROP TABLE logInteraction
DROP TABLE logInteractionKey
DROP TABLE logInteractionType
DROP TABLE logEventDetail
DROP TABLE logEvent
DROP TABLE logEventKey
DROP TABLE logEventType
DROP TABLE logSession
DROP TABLE logDesktop
DROP TABLE logMobile
DROP TABLE logDevice
DROP TABLE logModel
DROP TABLE logOS
DROP TABLE logUseragent
DROP TABLE logBrowser
GO

-- BROWSER

CREATE TABLE logBrowser
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
GO

-- DEVICE

CREATE TABLE logUseragent
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
GO

CREATE TABLE logOS
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
GO

CREATE TABLE logModel
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
GO

CREATE TABLE logDevice
(
	PK int primary key identity(0,1),	
	UseragentFK int foreign key references logUseragent(PK),
	BrowserFK int foreign key references logBrowser(PK),
	OSFK int foreign key references logOS(PK),
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

CREATE TABLE logMobile
(
	PK int primary key identity(0,1),
	DeviceFK int foreign key references logDevice(PK),
	ModelFK int foreign key references logModel(PK),
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

CREATE TABLE logDesktop
(
	PK int primary key identity(0,1),
	DeviceFK int foreign key references logDevice(PK),
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

-- SESSION

CREATE TABLE logSession
(
	PK int primary key identity(0,1),
	DeviceFK int foreign key references logDevice(PK),
	[Key] varchar(MAX) NOT NULL,
	Stamp datetime NOT NULL,
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

-- EVENT

CREATE TABLE logEventType
(
	PK int primary key identity(0,1),
	Value varchar(250) NOT NULL,
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

CREATE TABLE logEventKey
(
	PK int primary key identity(0,1),
	Value varchar(250) NOT NULL,
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

CREATE TABLE logEvent
(
	PK int primary key identity(0,1),
	SessionFK int foreign key references logSession(PK),
	TypeFK int foreign key references logEventType(PK),		
	Stamp datetime NOT NULL,
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

CREATE TABLE logEventDetail
(
	PK int primary key identity(0,1),	
	EventFK int foreign key references logEvent(PK),
	KeyFK int foreign key references logEventKey(PK),	
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

-- INTERACTION

CREATE TABLE logInteractionType
(
	PK int primary key identity(0,1),
	Value varchar(250) NOT NULL,
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

CREATE TABLE logInteractionKey
(
	PK int primary key identity(0,1),
	Value varchar(250) NOT NULL,
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

CREATE TABLE logInteraction
(
	PK int primary key identity(0,1),	
	SessionFK int foreign key references logSession(PK),
	TypeFK int foreign key references logInteractionType(PK),	
	Stamp datetime NOT NULL,
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

CREATE TABLE logInteractionDetail
(
	PK int primary key identity(0,1),
	InteractionFK int foreign key references logInteraction(PK),	
	KeyFK int foreign key references logInteractionKey(PK),	
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

-- EXCEPTION

CREATE TABLE logException
(
	PK int primary key identity(0,1),
	SessionFK int foreign key references logSession(PK),
	[File] varchar(250) NOT NULL,
	Method varchar(250) NOT NULL,
	[Subject] varchar(1000) NOT NULL,
	[Message] varchar(MAX) NOT NULL,
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

-- LOCATION

CREATE TABLE logCountry
(
	PK int primary key identity(0,1),
	Value varchar(250) NOT NULL,
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

CREATE TABLE logRegion
(
	PK int primary key identity(0,1),
	Value varchar(250) NOT NULL,
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

CREATE TABLE logCity
(
	PK int primary key identity(0,1),
	Value varchar(250) NOT NULL,
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

CREATE TABLE logLocation
(
	PK int primary key identity(0,1),		
	CountryFK int foreign key references logCountry(PK),
	RegionFK int foreign key references logRegion(PK),
	CityFK int foreign key references logCity(PK),	
	IP varchar(50) NOT NULL,
	Latitude varchar(50) NOT NULL,
	Longitude varchar(50) NOT NULL,
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

-- HTTP

CREATE TABLE logRequestType
(
	PK int primary key identity(0,1),
	Value varchar(250) NOT NULL,
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

CREATE TABLE logRequest
(
	PK int primary key identity(0,1),
	TypeFK int foreign key references logRequestType(PK),
	Url varchar(5000) NOT NULL,
	Headers varchar(MAX) NOT NULL,
	Body varchar(MAX) NOT NULL,
	Stamp datetime NOT NULL,
	Arrival datetime NOT NULL,
	Delivery datetime NOT NULL,
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

CREATE TABLE logResponseType
(
	PK int primary key identity(0,1),
	Value varchar(250) NOT NULL,
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

CREATE TABLE logResponse
(
	PK int primary key identity(0,1),
	RequestFK int foreign key references logRequest(PK),
	TypeFK int foreign key references logResponseType(PK),
	Headers varchar(MAX) NOT NULL,
	Body varchar(MAX) NOT NULL,
	Expired bit NOT NULL,
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

CREATE TABLE logHttp
(
	PK int primary key identity(0,1),
	SessionFK int foreign key references logSession(PK),	
	LocationFK int foreign key references logLocation(PK),
	RequestFK int foreign key references logRequest(PK),
	ResponseFK int foreign key references logResponse(PK),
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

INSERT INTO logBrowser VALUES ('NULL', 'NULL', GETDATE(), 'NULL', GETDATE(), 'NULL', GETDATE(), 'NULL', 0)
INSERT INTO logUseragent VALUES ('NULL', 'NULL', GETDATE(), 'NULL', GETDATE(), 'NULL', GETDATE(), 'NULL', 0)
INSERT INTO logOS VALUES ('NULL', 0, 0, 'NULL', GETDATE(), 'NULL', GETDATE(), 'NULL', GETDATE(), 'NULL', 0)
INSERT INTO logModel VALUES ('NULL', 'NULL', 'NULL', GETDATE(), 'NULL', GETDATE(), 'NULL', GETDATE(), 'NULL', 0)
INSERT INTO logDevice VALUES (0, 0, 0, 'NULL', GETDATE(), 'NULL', GETDATE(), 'NULL', GETDATE(), 'NULL', 0)
INSERT INTO logMobile VALUES (0, 0, 'NULL', GETDATE(), 'NULL', GETDATE(), 'NULL', GETDATE(), 'NULL', 0)
INSERT INTO logDesktop VALUES (0, 'NULL', GETDATE(), 'NULL', GETDATE(), 'NULL', GETDATE(), 'NULL', 0)
INSERT INTO logSession VALUES (0, 'NULL', GETDATE(), 'NULL', GETDATE(), 'NULL', GETDATE(), 'NULL', GETDATE(), 'NULL', 0)
INSERT INTO logEventType VALUES ('NULL', 'NULL', GETDATE(), 'NULL', GETDATE(), 'NULL', GETDATE(), 'NULL', 0)
INSERT INTO logEventKey VALUES ('NULL', 'NULL', GETDATE(), 'NULL', GETDATE(), 'NULL', GETDATE(), 'NULL', 0)
INSERT INTO logEvent VALUES (0, 0, GETDATE(), 'NULL', GETDATE(), 'NULL', GETDATE(), 'NULL', GETDATE(), 'NULL', 0)
INSERT INTO logEventDetail VALUES (0, 0, 'NULL', 'NULL', GETDATE(), 'NULL', GETDATE(), 'NULL', GETDATE(), 'NULL', 0)
INSERT INTO logInteractionType VALUES ('NULL', 'NULL', GETDATE(), 'NULL', GETDATE(), 'NULL', GETDATE(), 'NULL', 0)
INSERT INTO logInteractionKey VALUES ('NULL', 'NULL', GETDATE(), 'NULL', GETDATE(), 'NULL', GETDATE(), 'NULL', 0)
INSERT INTO logInteraction VALUES (0, 0, GETDATE(), 'NULL', GETDATE(), 'NULL', GETDATE(), 'NULL', GETDATE(), 'NULL', 0)
INSERT INTO logInteractionDetail VALUES (0, 0, 'NULL', 'NULL', GETDATE(), 'NULL', GETDATE(), 'NULL', GETDATE(), 'NULL', 0)
INSERT INTO logException VALUES (0, 'NULL', 'NULL', 'NULL', 'NULL', 'NULL', GETDATE(), 'NULL', GETDATE(), 'NULL', GETDATE(), 'NULL', 0)
INSERT INTO logCountry VALUES ('NULL', 'NULL', GETDATE(), 'NULL', GETDATE(), 'NULL', GETDATE(), 'NULL', 0)
INSERT INTO logRegion VALUES ('NULL', 'NULL', GETDATE(), 'NULL', GETDATE(), 'NULL', GETDATE(), 'NULL', 0)
INSERT INTO logCity VALUES ('NULL', 'NULL', GETDATE(), 'NULL', GETDATE(), 'NULL', GETDATE(), 'NULL', 0)
INSERT INTO logLocation VALUES (0, 0, 0, 'NULL', 'NULL', 'NULL', 'NULL', GETDATE(), 'NULL', GETDATE(), 'NULL', GETDATE(), 'NULL', 0)
INSERT INTO logRequestType VALUES ('NULL', 'NULL', GETDATE(), 'NULL', GETDATE(), 'NULL', GETDATE(), 'NULL', 0)
INSERT INTO logRequest VALUES (0, 'NULL', 'NULL', 'NULL', GETDATE(), GETDATE(), GETDATE(), 'NULL', GETDATE(), 'NULL', GETDATE(), 'NULL', GETDATE(), 'NULL', 0)
INSERT INTO logResponseType VALUES ('NULL', 'NULL', GETDATE(), 'NULL', GETDATE(), 'NULL', GETDATE(), 'NULL', 0)
INSERT INTO logResponse VALUES (0, 0, 'NULL', 'NULL', 0, 'NULL', GETDATE(), 'NULL', GETDATE(), 'NULL', GETDATE(), 'NULL', 0)
INSERT INTO logHttp VALUES (0, 0, 0, 0, 'NULL', GETDATE(), 'NULL', GETDATE(), 'NULL', GETDATE(), 'NULL', 0)