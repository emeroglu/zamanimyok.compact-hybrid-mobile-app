DROP PROCEDURE Mock
DROP PROCEDURE Regenerate
GO

CREATE PROCEDURE Regenerate
AS

	EXEC Flow_Remove
	EXEC Servant_Remove
	EXEC Affiliate_Remove
	EXEC User_Remove	
	EXEC Vehicle_Remove
	EXEC Payment_Remove
	EXEC Auth_Remove

	EXEC Auth_Generate
	EXEC Payment_Generate
	EXEC Vehicle_Generate
	EXEC User_Generate	
	EXEC Affiliate_Generate
	EXEC Servant_Generate
	EXEC Flow_Generate

GO

CREATE PROCEDURE Mock
AS	

	INSERT INTO authMember VALUES (1, '', GETDATE(), 'DB', GETDATE(), '', GETDATE(), '', 1)

	INSERT INTO authCredential VALUES (1, '', GETDATE(), 'DB', GETDATE(), '', GETDATE(), '', 1)

	INSERT INTO authCredentialDetail VALUES (1, 1, 'marslan', '', GETDATE(), 'DB', GETDATE(), '', GETDATE(), '', 1)
	INSERT INTO authCredentialDetail VALUES (1, 2, 'marslan@gmail.com', '', GETDATE(), 'DB', GETDATE(), '', GETDATE(), '', 1)
	INSERT INTO authCredentialDetail VALUES (1, 3, '1234', '', GETDATE(), 'DB', GETDATE(), '', GETDATE(), '', 1)

	INSERT INTO userSelf VALUES (1, '', GETDATE(), 'DB', GETDATE(), '', GETDATE(), '', 1)

	INSERT INTO userDetail VALUES (1, 1, 'Murat Arslan', '', GETDATE(), 'DB', GETDATE(), '', GETDATE(), '', 1)
	INSERT INTO userDetail VALUES (1, 2, 'marslan@gmail.com', '', GETDATE(), 'DB', GETDATE(), '', GETDATE(), '', 1)
	INSERT INTO userDetail VALUES (1, 3, '+90 534 658 9754', '', GETDATE(), 'DB', GETDATE(), '', GETDATE(), '', 1)




	INSERT INTO authMember VALUES (1, '', GETDATE(), 'DB', GETDATE(), '', GETDATE(), '', 1)

	INSERT INTO authCredential VALUES (2, '', GETDATE(), 'DB', GETDATE(), '', GETDATE(), '', 1)

	INSERT INTO authCredentialDetail VALUES (2, 1, 'csentürk', '', GETDATE(), 'DB', GETDATE(), '', GETDATE(), '', 1)
	INSERT INTO authCredentialDetail VALUES (2, 2, 'csenturk@gmail.com', '', GETDATE(), 'DB', GETDATE(), '', GETDATE(), '', 1)
	INSERT INTO authCredentialDetail VALUES (2, 3, '1234', '', GETDATE(), 'DB', GETDATE(), '', GETDATE(), '', 1)

	INSERT INTO userSelf VALUES (2, '', GETDATE(), 'DB', GETDATE(), '', GETDATE(), '', 1)

	INSERT INTO userDetail VALUES (2, 1, 'Cüneyt Şentürk', '', GETDATE(), 'DB', GETDATE(), '', GETDATE(), '', 1)
	INSERT INTO userDetail VALUES (2, 2, 'csenturk@gmail.com', '', GETDATE(), 'DB', GETDATE(), '', GETDATE(), '', 1)
	INSERT INTO userDetail VALUES (2, 3, '+90 534 658 9754', '', GETDATE(), 'DB', GETDATE(), '', GETDATE(), '', 1)





	INSERT INTO authMember VALUES (1, '', GETDATE(), 'DB', GETDATE(), '', GETDATE(), '', 1)

	INSERT INTO authCredential VALUES (3, '', GETDATE(), 'DB', GETDATE(), '', GETDATE(), '', 1)

	INSERT INTO authCredentialDetail VALUES (3, 1, 'emeroglu', '', GETDATE(), 'DB', GETDATE(), '', GETDATE(), '', 1)
	INSERT INTO authCredentialDetail VALUES (3, 2, 'emeroglu@ku.edu.tr', '', GETDATE(), 'DB', GETDATE(), '', GETDATE(), '', 1)
	INSERT INTO authCredentialDetail VALUES (3, 3, '1234', '', GETDATE(), 'DB', GETDATE(), '', GETDATE(), '', 1)

	INSERT INTO userSelf VALUES (3, '', GETDATE(), 'DB', GETDATE(), '', GETDATE(), '', 1)

	INSERT INTO userDetail VALUES (3, 1, 'Erhan Emre Eroğlu', '', GETDATE(), 'DB', GETDATE(), '', GETDATE(), '', 1)
	INSERT INTO userDetail VALUES (3, 2, 'emeroglu@ku.edu.tr', '', GETDATE(), 'DB', GETDATE(), '', GETDATE(), '', 1)
	INSERT INTO userDetail VALUES (3, 3, '+90 534 658 9754', '', GETDATE(), 'DB', GETDATE(), '', GETDATE(), '', 1)

	INSERT INTO userAddress VALUES (3, 'Ev', 'Barbaros Mah. Ardıç Sk. No:7 A-1 (Uphill Migros Altı, Ataşehir Emniyet Müdürlüğü Karşısı) Ataşehir – İSTANBUL, TR', '', GETDATE(), 'DB', GETDATE(), '', GETDATE(), '', 1)

	INSERT INTO userVehicle VALUES (3, 56, '', GETDATE(), 'DB', GETDATE(), '', GETDATE(), '', 1)

	INSERT INTO userVehicleDetail VALUES (1, 1, '34 KOL 854', '', GETDATE(), 'DB', GETDATE(), '', GETDATE(), '', 1)



	INSERT INTO authMember VALUES (1, '', GETDATE(), 'DB', GETDATE(), '', GETDATE(), '', 1)

	INSERT INTO authCredential VALUES (4, '', GETDATE(), 'DB', GETDATE(), '', GETDATE(), '', 1)

	INSERT INTO authCredentialDetail VALUES (4, 1, 'gkbrk', '', GETDATE(), 'DB', GETDATE(), '', GETDATE(), '', 1)
	INSERT INTO authCredentialDetail VALUES (4, 2, 'gokberkerust@gmail.com', '', GETDATE(), 'DB', GETDATE(), '', GETDATE(), '', 1)
	INSERT INTO authCredentialDetail VALUES (4, 3, '1234', '', GETDATE(), 'DB', GETDATE(), '', GETDATE(), '', 1)

	INSERT INTO userSelf VALUES (4, '', GETDATE(), 'DB', GETDATE(), '', GETDATE(), '', 1)

	INSERT INTO userDetail VALUES (4, 1, 'Gökberk Erüst', '', GETDATE(), 'DB', GETDATE(), '', GETDATE(), '', 1)
	INSERT INTO userDetail VALUES (4, 2, 'gokberkerust@gmail.com', '', GETDATE(), 'DB', GETDATE(), '', GETDATE(), '', 1)
	INSERT INTO userDetail VALUES (4, 3, '+90 534 658 9754', '', GETDATE(), 'DB', GETDATE(), '', GETDATE(), '', 1)

	INSERT INTO userAddress VALUES (4, 'Ev', 'Barbaros Mah. Ardıç Sk. No:7 A-1 (Uphill Migros Altı, Ataşehir Emniyet Müdürlüğü Karşısı) Ataşehir – İSTANBUL, TR', '', GETDATE(), 'DB', GETDATE(), '', GETDATE(), '', 1)

	INSERT INTO userVehicle VALUES (4, 52, '', GETDATE(), 'DB', GETDATE(), '', GETDATE(), '', 1)

	INSERT INTO userVehicleDetail VALUES (2, 1, '34 KOL 854', '', GETDATE(), 'DB', GETDATE(), '', GETDATE(), '', 1)



	INSERT INTO authMember VALUES (1, '', GETDATE(), 'DB', GETDATE(), '', GETDATE(), '', 1)

	INSERT INTO authCredential VALUES (5, '', GETDATE(), 'DB', GETDATE(), '', GETDATE(), '', 1)

	INSERT INTO authCredentialDetail VALUES (5, 1, 'kcenan', '', GETDATE(), 'DB', GETDATE(), '', GETDATE(), '', 1)
	INSERT INTO authCredentialDetail VALUES (5, 2, 'kcenan@ku.edu.tr', '', GETDATE(), 'DB', GETDATE(), '', GETDATE(), '', 1)
	INSERT INTO authCredentialDetail VALUES (5, 3, '1234', '', GETDATE(), 'DB', GETDATE(), '', GETDATE(), '', 1)

	INSERT INTO userSelf VALUES (5, '', GETDATE(), 'DB', GETDATE(), '', GETDATE(), '', 1)

	INSERT INTO userDetail VALUES (5, 1, 'Kağan Cenan', '', GETDATE(), 'DB', GETDATE(), '', GETDATE(), '', 1)
	INSERT INTO userDetail VALUES (5, 2, 'kcenan@ku.edu.tr', '', GETDATE(), 'DB', GETDATE(), '', GETDATE(), '', 1)
	INSERT INTO userDetail VALUES (5, 3, '+90 534 658 9754', '', GETDATE(), 'DB', GETDATE(), '', GETDATE(), '', 1)

	INSERT INTO userAddress VALUES (5, 'Ev', 'Barbaros Mah. Ardıç Sk. No:7 A-1 (Uphill Migros Altı, Ataşehir Emniyet Müdürlüğü Karşısı) Ataşehir – İSTANBUL, TR', '', GETDATE(), 'DB', GETDATE(), '', GETDATE(), '', 1)

	INSERT INTO userVehicle VALUES (5, 56, '', GETDATE(), 'DB', GETDATE(), '', GETDATE(), '', 1)

	INSERT INTO userVehicleDetail VALUES (3, 1, '34 KOL 854', '', GETDATE(), 'DB', GETDATE(), '', GETDATE(), '', 1)
	



	INSERT INTO affCity VALUES ('İstanbul', '', GETDATE(), 'DB', GETDATE(), '', GETDATE(), '', 1)
	INSERT INTO affDistrict VALUES (1, 'Ataşehir', '', GETDATE(), 'DB', GETDATE(), '', GETDATE(), '', 1)
	
	INSERT INTO affLocation VALUES (1, 1, '40.991857', '29.1340255', 'Ataşehir Atatürk Mahallesi, Ataşehir Atatürk Mh., 3. Caddesi, 34398 Ataşehir/İstanbul', '', GETDATE(), 'DB', GETDATE(), '', GETDATE(), '', 1)
	INSERT INTO affLocation VALUES (1, 1, '40.9898405', '29.1376745', 'Ataşehir Atatürk Mahallesi, Ataşehir Blv., 34758 Ataşehir/İstanbul', '', GETDATE(), 'DB', GETDATE(), '', GETDATE(), '', 1)
	INSERT INTO affLocation VALUES (1, 1, '40.9953384', '29.1041841', 'Barbaros Mah. Ardıç Sk. No:7 A-1 (Uphill Migros Altı, Ataşehir Emniyet Müdürlüğü Karşısı) Ataşehir – İSTANBUL, TR', '', GETDATE(), 'DB', GETDATE(), '', GETDATE(), '', 1)

	INSERT INTO affFranchise VALUES ('Autowax', '', GETDATE(), 'DB', GETDATE(), '', GETDATE(), '', 1)
	INSERT INTO affFranchise VALUES ('Meguair''s', '', GETDATE(), 'DB', GETDATE(), '', GETDATE(), '', 1)
	INSERT INTO affFranchise VALUES ('Fresh Car', '', GETDATE(), 'DB', GETDATE(), '', GETDATE(), '', 1)

	INSERT INTO affSelf VALUES (1, 1, 'Autowax', '', GETDATE(), 'DB', GETDATE(), '', GETDATE(), '', 1)
	INSERT INTO affSelf VALUES (2, 2, 'Meguair''s', '', GETDATE(), 'DB', GETDATE(), '', GETDATE(), '', 1)
	INSERT INTO affSelf VALUES (3, 3, 'Fresh Car', '', GETDATE(), 'DB', GETDATE(), '', GETDATE(), '', 1)

	INSERT INTO affDetail VALUES (1, 1, '/autowax', '', GETDATE(), 'DB', GETDATE(), '', GETDATE(), '', 1)
	INSERT INTO affDetail VALUES (2, 1, '/meguairs', '', GETDATE(), 'DB', GETDATE(), '', GETDATE(), '', 1)
	INSERT INTO affDetail VALUES (3, 1, '/freshcar', '', GETDATE(), 'DB', GETDATE(), '', GETDATE(), '', 1)

	INSERT INTO affService VALUES (1, 'Oto Yıkama', '', GETDATE(), 'DB', GETDATE(), '', GETDATE(), '', 1)
	INSERT INTO affService VALUES (2, 'Oto Yıkama', '', GETDATE(), 'DB', GETDATE(), '', GETDATE(), '', 1)
	INSERT INTO affService VALUES (3, 'Oto Yıkama', '', GETDATE(), 'DB', GETDATE(), '', GETDATE(), '', 1)

	INSERT INTO affPricing VALUES (1, '', GETDATE(), 'DB', GETDATE(), '', GETDATE(), '', 1)
	INSERT INTO affPricing VALUES (2, '', GETDATE(), 'DB', GETDATE(), '', GETDATE(), '', 1)
	INSERT INTO affPricing VALUES (3, '', GETDATE(), 'DB', GETDATE(), '', GETDATE(), '', 1)

	INSERT INTO affPricingDetail VALUES (1, 1, '40', '', GETDATE(), 'DB', GETDATE(), '', GETDATE(), '', 1)
	INSERT INTO affPricingDetail VALUES (2, 1, '40', '', GETDATE(), 'DB', GETDATE(), '', GETDATE(), '', 1)
	INSERT INTO affPricingDetail VALUES (3, 1, '40', '', GETDATE(), 'DB', GETDATE(), '', GETDATE(), '', 1)


	INSERT INTO authMember VALUES (3, '', GETDATE(), 'DB', GETDATE(), '', GETDATE(), '', 1)

	INSERT INTO authCredential VALUES (6, '', GETDATE(), 'DB', GETDATE(), '', GETDATE(), '', 1)

	INSERT INTO authCredentialDetail VALUES (6, 1, 'ahmet', '', GETDATE(), 'DB', GETDATE(), '', GETDATE(), '', 1)
	INSERT INTO authCredentialDetail VALUES (6, 2, 'ahmet@autowax.com', '', GETDATE(), 'DB', GETDATE(), '', GETDATE(), '', 1)
	INSERT INTO authCredentialDetail VALUES (6, 3, '1234', '', GETDATE(), 'DB', GETDATE(), '', GETDATE(), '', 1)

	INSERT INTO serSelf VALUES (6, 1, '', GETDATE(), 'DB', GETDATE(), '', GETDATE(), '', 1)
				
	INSERT INTO serDetail VALUES (1, 1, 'Ahmet Mehmet', '', GETDATE(), 'DB', GETDATE(), '', GETDATE(), '', 1)
	INSERT INTO serDetail VALUES (1, 2, 'ahmet@autowax.com', '', GETDATE(), 'DB', GETDATE(), '', GETDATE(), '', 1)
	INSERT INTO serDetail VALUES (1, 3, '+90 534 658 9754', '', GETDATE(), 'DB', GETDATE(), '', GETDATE(), '', 1)
	INSERT INTO serDetail VALUES (1, 4, '/ahmet', '', GETDATE(), 'DB', GETDATE(), '', GETDATE(), '', 1)



	INSERT INTO authMember VALUES (3, '', GETDATE(), 'DB', GETDATE(), '', GETDATE(), '', 1)

	INSERT INTO authCredential VALUES (7, '', GETDATE(), 'DB', GETDATE(), '', GETDATE(), '', 1)

	INSERT INTO authCredentialDetail VALUES (7, 1, 'mehmet', '', GETDATE(), 'DB', GETDATE(), '', GETDATE(), '', 1)
	INSERT INTO authCredentialDetail VALUES (7, 2, 'mehmet@meguairs.com', '', GETDATE(), 'DB', GETDATE(), '', GETDATE(), '', 1)
	INSERT INTO authCredentialDetail VALUES (7, 3, '1234', '', GETDATE(), 'DB', GETDATE(), '', GETDATE(), '', 1)

	INSERT INTO serSelf VALUES (7, 2, '', GETDATE(), 'DB', GETDATE(), '', GETDATE(), '', 1)
				
	INSERT INTO serDetail VALUES (2, 1, 'Mehmet Ahmet', '', GETDATE(), 'DB', GETDATE(), '', GETDATE(), '', 1)
	INSERT INTO serDetail VALUES (2, 2, 'mehmet@meguairs.com', '', GETDATE(), 'DB', GETDATE(), '', GETDATE(), '', 1)
	INSERT INTO serDetail VALUES (2, 3, '+90 534 658 9754', '', GETDATE(), 'DB', GETDATE(), '', GETDATE(), '', 1)


GO