DROP TABLE IF EXISTS Items CASCADE;
DROP TYPE IF EXISTS ItemCategory CASCADE;

CREATE TYPE ItemCategory AS ENUM ('Poultry', 'Meat', 'Dairy', 'Fruit', 'Vegetables', 'Other');

CREATE TABLE Items (
    itemid SERIAL primary key,
    category ItemCategory,
    itemname TEXT NOT NULL,
    expdate Date
);

INSERT INTO Items (category, itemname, expdate) 
VALUES ('Poultry', 'Chicken', '06-04-2026'), ('Meat', 'Beef Patties', '06-02-2026');