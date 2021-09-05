use aoimarket;

select * from itemlist;

create table mainBanner(
	bannerpath varchar(999) not null,
	name varchar(999) not null
);

select * from mainBanner;
select * from member;
alter table itemlist add column item_PhoneNum varchar(30) after aEmail;


select * from itemlist where replace(item_title,' ','') like '%치킨피자%';

select * from itemlist;

desc itemReply13;
drop table itemReply13;

create table itemReply(
	item_id int not null,
    reply_idx int not null,
    par_comment int not null,
	reply_id varchar(30) not null,
	reply_name varchar(30) not null,
    reply_contents text not null
);
alter table itemReply add column reply_date varchar(30) not null;
select * from itemReply order by item_id,reply_idx asc;
update itemReply set reply_date = 111;
delete from itemReply where reply_contents = '123';



drop table itemlist;

create table itemlist(
	item_id int not null primary key auto_increment,
    item_title varchar(30) not null,
    item_admin varchar(30) not null,
    item_price int not null,
    item_firstimg text,
    item_secondimg text,
    item_third text,
    item_trade varchar(10),
    item_date varchar(99),
    item_stat varchar(30),
    item_coment text,
    item_kate varchar(30)
);
select * from itemReply where 

alter table itemlist add column item_selling varchar(15);
alter table itemlist add column item_coment text;
alter table itemlist add column item_kate varchar(30);
alter table itemlist add column item_view int;
commit;
update itemlist set item_stat='양호',item_coment='hello!',item_kate='인형' where item_trade='직거래';

update itemlist set item_selling = '판매완료' where item_id='2';
update itemlist set item_price =1900000 where item_id='3';
update itemlist set item_stat = '불량' where item_id='4';
alter table itemlist change item_kate item_kate1 varchar(20);

update itemlist set item_kate2 = '뚱이';

select * from itemlist;
alter table itemlist add column item_kate2 varchar(20);
alter table itemlist modify column item_kate2 varchar(20) after item_kate;
drop table itemlist;

alter table itemlist add (item_imgfir TEXT);
alter table itemlist add (item_imgsec TEXT);
alter table itemlist add (item_imgthi TEXT);
alter table itemlist drop item_third;

desc itemlist;

insert into itemlist(item_title,item_admin,item_price,item_firstimg,item_secondimg,item_third,item_trade,item_date) values('hello','admin','12333',null,null,null,'직거래',now());

delete from itemlist where item_title = '핑크뚱이';


select max(item_id) from itemlist;

select * from itemlist;

insert into itemlist values('1','연예인 마스크','kimgtae12','14000','','','','직거래','2021년 08월 24일');
delete from itemlist where item_admin='kimgtae12';

rollback;

insert into mainBanner values('https://storage.googleapis.com/itemimg/mainBanner/','banner1.jpg');
insert into mainBanner values('https://storage.googleapis.com/itemimg/mainBanner/','banner2.jpg');
insert into mainBanner values('https://storage.googleapis.com/itemimg/mainBanner/','banner3.jpg');

set sql_safe_updates=0;
delete from mainBanner where name like 'banner%';


select * from mainBanner;

create table member(
	aId varchar(20) not null primary key,
    aPw varchar(100) not null,
    aName varchar(10) not null,
    aEmail varchar(20) not null,
    joinDate varchar(40) not null,
    certifi varchar(20) not null
);

alter table member change column aEmailFirst aEmail varchar(20) not null;

select * from member;
insert into member values('admin','1234','김경태','kimgtea@naver.com',now(),'ok');
delete from member where aId = 'admin';

create table verifykey(
 aId varchar(20) not null,
 aEmail varchar(20) not null,
 verifyKey varchar(20) not null
 );
 
 select * from verifykey;
 
 delete from verifykey;
 
 drop table verifykey;
 drop table member;
 rollback;
 
 alter table member add certifi varchar(20);
 alter table member modify joinDate varchar(40) not null; 
 
 
 
 alter table verifykey modify verifyKey varchar(20) not null;
 
 select * from verifykey;
 select * from member;
 select * from itemlist;
 
 select * from mainBanner;
 
 update mainBanner set bannerpath ='https://storage.googleapis.com/itemimgbucket/mainbanner/' where name like 'banner%';
 
 
 
 
 delete from verifykey where aId = 'aaaa';
delete from member where aId = 'aaaa'; 