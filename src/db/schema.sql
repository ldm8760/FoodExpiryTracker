DROP TABLE IF EXISTS Items CASCADE;
DROP TYPE IF EXISTS ItemCategory CASCADE;

CREATE TYPE ItemCategory AS ENUM ('Poultry', 'Meat', 'Dairy', 'Fruit', 'Vegetables', 'Other');

CREATE TABLE Items (
    ItemID SERIAL primary key,
    Category ItemCategory,
    ItemName TEXT NOT NULL,
    ExpDate Date
);

INSERT INTO Items (Category, ItemName, ExpDate) 
VALUES ('Poultry', 'Chicken', '06-04-2026'), ('Meat', 'Beef Patties', '06-02-2026');