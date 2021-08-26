create table itemlist(
  item_title varchar(20) not null,
  item_price int(20) not null,
  item_firstimg varchar(999),
  item_secondimg varchar(999),
  item_third varchar(999),
  item_date date not null
);
insert into
  itemlist
values('test', '1111', null, null, null, now());
insert into
  itemlist
values('test2', '2222', null, null, null, now());