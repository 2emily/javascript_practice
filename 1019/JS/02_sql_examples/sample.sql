-- 커피 테이블 생성
CREATE TABLE Coffee (
  id          integer       not null AUTO_INCREMENT,
  type        nvarchar(64)  not null,
  ordered_by  nvarchar(32)  not null,
  primary key(id)
);
-- 커피 테이블에서 모든 행을 읽어오기
SELECT * FROM Coffee;
