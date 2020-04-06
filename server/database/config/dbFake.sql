BEGIN;

    INSERT INTO users
        (user_name, password, role)
    VALUES('admin', '$2a$05$WRLE5TPY4ppszWklRiX0m.kjyX8uMtZ76O9lt8y8zXilM.vl/5hjS', 'admin');
    -- for TUser information 1 captain , 2 customer
    INSERT INTO TUser
        (s_name, s_mobile_number, s_email, b_status, s_address, s_image, i_type, s_password)
    VALUES
     ('دينا معين حجي','+9705588888888','test8@hotmail.com',true,'غزة','test.png',2,'123'),
     ('جملات عبدالرحمن شملخ','+97078888877888','test9@hotmail.com',true,'شيخ رضوان','test.png',2,'123'),
     ('ناريمان محمد حلس','+970877888','test10@hotmail.com',true,'غزة','test.png',2,'123'),
     ('شروق عبدالله سعد','+9708774547854888','test11@hotmail.com',true,'غزة','test.png',2,'123'),
     ('أنغام عاطف عبيد','+9708774547854888','test12@hotmail.com',true,'خانيونس','test.png',2,'123'),
     ('حنين عماد شهوان','+970788888877888','test13@hotmail.com',true,'ساحة الشوا','test.png',2,'123'),
     ('فاطمة رياض صيام','+97088777888','test14@hotmail.com',true,'رفح','test.png',2,'123'),
     ('اسراء خميس سليمان','+9708877787888','test15@hotmail.com',true,'غزة','test.png',2,'123'),
     ('أحمد عصام عبد اللطيف','+97088777888','test16@hotmail.com',true,'رفح','test.png',1,'123'),
     ('أمين مسعود الأخشم','+97088777788888','test17@hotmail.com',true,'غزة','test.png',1,'123'),
     ('عبدالله عماد عمار','+97455777788888','test18@hotmail.com',true,'غزة','test.png',1,'123'),
     ('أنيس يوسف الريس','+974777788888','test19@hotmail.com',true,'برشلونة','test.png',1,'123'),
     ('كنعان جمال حسونة','+9747778888','test20@hotmail.com',true,'غزة','test.png',1,'123'),
     ('أحمد محمد العلمي','+974745778888','test21@hotmail.com',true,'خانيونس','test.png',1,'123'),
     ('خضر احمد مرتجى','+97474577778888','test22@hotmail.com',true,'نصر','test.png',1,'123');
    INSERT INTO places
        (s_name)
    VALUES
            ('كابيتل مول'),
            (' خيال مول'),
            ('الطابون'),
            ('عمو عماد'),
            ('سامي بيتزا'),
            ('دونا ستايل'),
            ('فهد'),
            ('سفير الحب'),
            ('مطعم الدار'),
            ('واو فاشون'),
            ('مطعم العافية'),
            ('هدايانا');

    INSERT INTO orders
        (fk_i_place_id, customer_name, s_customer_address, s_customer_phone, i_status)
    VALUES
        (1, 'رنا صلاح عبيد', 'الشمال','+970599999999', 0),
        (2, 'زكية عرفات ابو جراد', 'بيت لاهيا','+970599999', 1),
        (3, 'هبة خليل الكيلاني', 'بيت لاهيا','+9705999999', 0),
        (4, 'سها ياسر البرعي', 'الشمال','+97059999999', 1),
        (5, 'مي فضل الرنتيسي', 'دير البلح','+9744559999999', 0),
        (6, 'ريهام خالد رحيم', 'تل الهوا','+97478559999999', 1),
        (7,null,null,null, 0),
        (8,null,null,null, 1),
        (9,null,null,null, 0),
        (10,null,null,null, 1),
        (11,null,null,null, 0),
        (12,null,null,null, 1);

    INSERT INTO items
        (s_name, fk_i_order_id, f_price)
    VALUES

        ('بنطلون', 1, 90),
        ('ساعة', 2, 50),
        ('بيتزا', 3, 20),
        ('خضروات', 4, 70),
        ('بيتزا', 5, 20),
        ('تنورة', 6, 100),
        ('شاورما', 7, 10),
        ('تحفة', 8, 50),
        ('مشاوي', 9, 30),
        ('بلوزة', 10, 70),
        ('مشاوي', 11, 30),
        ('تحفة', 12, 50);

    INSERT INTO TUser_order
        (tuser_id, order_id)
    VALUES
     (9,1), 
     (10,2), 
     (11,3), 
     (12,4), 
     (13,5),
     (14,6),
     (1,8), 
     (9,8), 
     (2,9), 
     (9,9), 
     (3,7),
     (10,7), 
     (4,10), 
     (10,10), 
     (5,11), 
     (11,11), 
     (6,12),
     (14,12);
    COMMIT;