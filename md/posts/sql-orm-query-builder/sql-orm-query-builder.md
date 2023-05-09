#

## 🤔 Backend - Database Interaction

Communicating with a relational database within a project is a common operation that all backend systems want to achieve. However, there are different methodologies to interact with a database via SQL.

Even though it's possible for a frontend application to directly interact with a remote database, it is considered a poor security practice to do so. Therefore, in this blog, we will only talk about the well-known interaction between backends and remote relational databases.

### 👉 Native SQL

Raw SQL can be considered the most fundamental and low-level interaction with an SQL database.
For example, the backend can simply expose a `POST` endpoint to update a database via `CREATE TABLE` or `UPDATE TABLE`.

In a Python application, executing an SQL query can be as easy as

```python
    create_blogs_table = """
    CREATE TABLE `BlogPost` (
        `id` int NOT NULL AUTO_INCREMENT,
        `readTime` tinyint unsigned NOT NULL,
        `cover` varchar(255) NOT NULL,
        `description` varchar(255) NOT NULL,
        `publishedAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
        `title` varchar(255) NOT NULL,
        `views` int NOT NULL,
        PRIMARY KEY (`id`)
    )
    """

    connection = create_db_connection(url, username, password, database)
    execute_query(connection, create_blogs_table)
```

#### ✅ Advantages of using Native SQL

##### 1. Flexibility

With such low-level and fine-grained control, data retrieval tasks are only constrained by how good a developer is with SQL. Since SQL itself is an extremely powerful language, an application can harvest the full potential of its data.

#### ⛔️ Disadvantages of using Native SQL

##### 1. Data Mapping

When interacting with a database from an application using plain SQL, the returned data types are usually a tuple. Therefore, a programmer would need to map the data to its appropriate name and data types to be used in the application.

For example, parsing out all the fields from `BlogPost` can be programmed like so:

```py
    query = "SELECT * FROM `BlogPost` LIMIT 1"
    cur = execute_query(connection, query)
    (id, readTime, cover, description, pub, title, views) = cur
```

Parsing data like so needs intimate knowledge of the column's name and data type. In addition, as the number of tables and row scale up, the backend needs to keep track of the changes in the database, making data consistency difficult and impractical to maintain.

##### 2. SQL File Management

With repetitive operations, like fetching or updating customer data, it's a good practice to refactor those logics into their own SQL files. However, As the application scales up, more SQL files are generated hence creating unnecessary overheads for developers.

##### 3. SQL Injection

Since SQL queries are usually handled as strings, placeholders are usually used to enhance the power of SQL.

For example, a backend can fetch a defined number of blog posts per page sorted by views as follow:

```py
    limit = input("Number of Blogs?")

    query = f"""
        SELECT * 
        FROM `BlogPost` b 
        ORDER BY b.views DESC 
        LIMIT {limit};
    """

    cur = execute_query(connection, query)
    (id, readTime, cover, description, pub, title, views) = cur
```

However, without improper input sanitization, the placeholder can be a weak point for a SQL Injection attack.

For example, when the user input is invalid, like `I-love-SQL-😁`, the SQL execution would just return an error. However, when the input is valid but malicious, like `5; DROP ALL TABLE;` the SQL execution will erase all tables in the database.

##### 4. SQL Dialects

There are different dialects of SQL  like PostgreSQL, MySQL, SQLServer, or DB2. Writing raw queries for a particular dialect would require a tremendous amount of work to migrate to another one.

### 👉 SQL Query Builder

Query builder is a simple interface between SQL logic and the actual SQL queries. SQL builders avoid messy string concatenation and formatting. Query builders are also highly extensible and can take advantage of the full strength of SQL.

For example, in a well-known Python query builder `pypika`, and simple SQL query could be modeled as:

```python
    from pypika import Table, Query

    customers = Table('customers')
    q = Query.from_(customers).select(
        customers.id, customers.fname, customers.lname, customers.phone
    ).where(
        (customers.age >= 18) | (customers.lname == 'Mustermann')
    )
```

The above code will yield the following SQL

```SQL
    SELECT id,fname,lname,phone 
        FROM customers 
        WHERE age >= 18 AND lname = 'Mustermann'
```

In short, it is a layer of abstraction on top of native SQL. Using a query builder within your application can achieve some additional benefits.

#### ✅ Benefits of using a Query Builder

##### 1. Ease of Migration

Unlike Native SQL, query builders come with support for subtle dialect differences. This could be a life-saver when comes to migrating databases from one flavor to another.

Using a dialect like PostgreSQL in `pypika` is quite simple and intuitive.

```python
    from pypika import PostgreSQLQuery as Query
    customers = Table('customers')

    q = Query.into(customers).insert(
        (1, 'Jane', 'Doe', 'jane@example.com'),
        (2, 'John', 'Doe', 'john@example.com'))
```

##### 2. Query Transparency

Instead of investigating string queries and variable names to understand the functionality, using native Python code makes the logic more readable and maintainable. In addition, using native code comes with syntax highlighting and debugging capability from IDEs.

#### ⛔️ Disadvantages of Query Builders

##### 1. Understanding of the underlying table structure

Similar to Native SQL, interactions between applications and databases are based on raw SQL alone. Therefore, nothing is stopping the Query Builder to generate syntactically correct SQL, yet irrelevant to the schema of the targeted database.

##### 2. Data-Retrieval Definition

Similar to native SQL, the returned data are not formatted properly to be used in the application. For some databases, the returned data structure is a tuple of strings. Therefore, to be used within the application, additional transformations have to be done.

### 👉 Object Relational Mappers (ORM)

Similar to query builders, ORMs are interfaces/ abstraction layers on top of native queries. ORMs treat tables as objects and columns of the tables are simply an attribute of the corresponding class. In addition, ORMs usually handle database connections and management via a provided **database definition framework**.

#### Defining a schema

The ability to define a database schema within a programming language of choice is a god-like feature for most programmers.

For example, in `SQLAlchemy`- a popular Python ORM, defining a table has the following syntax:

```python
    engine = db.create_engine('postgresql://nathan:root@url')
    conn = engine.connect()
    metadata = db.MetaData()

    Student = db.Table('Student', metadata,
                db.Column('Id', db.Integer(), primary_key=True),
                db.Column('Name', db.String(255), nullable=False),
                db.Column('Major', db.String(255), default="Math"),
                db.Column('Pass', db.Boolean(), default=True)
                )

    metadata.create_all(engine)
```

The above code will generate table `STUDENT` with 4 columns `Id`, `Name`, `Major`, and `Pass`

#### Using ORMs with pre-defined schemas

To fetch the data based on the defined object schema, we can do the following:

```python
    query = Student.select().where(
        db.and_(
            Student.columns.Major == 'English',
            Student.columns.Pass != True))
    output = conn.execute(query)
    print(output.fetchall())
```

#### ✅ Benefits

##### 1. Dialects

Similar to query builders, ORMs support multiple dialects of SQL.
There are 5 main flavors that `SQLAlchemy` supports:
<https://docs.sqlalchemy.org/en/20/dialects/index.html#dialects>

Database|Fully tested in CI|Normal support|Best effort
--------|------------------|--------------|-----------
Microsoft SQL Server|2017|2012+|2005+
MySQL / MariaDB|5.6, 5.7, 8.0 / 10.4, 10.5|5.6+ / 10+|5.0.2+ / 5.0.2+
Oracle|11.2, 18c|11+|9+
PostgreSQL|9.6, 10, 11, 12, 13, 14|9.6+|9+
SQLite|3.21, 3.28+|3.12+|3.7.16+

##### 2. Code completion

As mentioned above, defining tables in `Python` or a language of choice gives programmers access to the autocomplete of the IDE. This creates a better programming experience and makes the developed code less prone to bugs.

##### 3. Centralized database management

With the ability to migrate based on schema changes, ORMs save programmers the troubles of tedious migration work.

For example, the previous `STUDENT` table can be extended or modified by simply execute the following:

```python
    Student = db.Table('Student', metadata,
                db.Column('Id', db.Integer(), primary_key=True),
                db.Column('Name', db.String(255), nullable=False),
                db.Column('Major', db.String(255), default="Math"),
                db.Column('Year', db.Integer(), default=1)
                )

    metadata.create_all(engine)
```

Now the ORM will drop the column `Pass` and extend the column `Year` with a default value of `1`.

Even though automatic schema management is a cool feature, access to modified data needs to be granted carefully to avoid unwanted side effects when multiple services are running.
This could be done at the database level where database administrators can customize access for different users.

#### ⛔️ Drawbacks

#### 1. Schema synchronization

The main point of using an ORM is to have the ORM manage schema changes for the application. However, if the database changes its underlying schema without the `ORM schema` updating, there will be a schema mismatch.

In a real programming environment, a schema mismatch can happen multiple times when programmers are working out of sync with each other.
The matter can become more complicated when different services are using the same database, all using an ORM, yet in different programming languages.

Schema mismatch can happen when programmers use different tools to manage their databases.

For example, in `pgAdmin 4`, database schemas can be edited visually via the `ERD Tool`.

<center>
    <iframe
        width="560"
        height="315"
        src="https://www.youtube-nocookie.com/embed/mjQW2vO6_kY"
        title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen>
    </iframe>
</center>

`ERD Tool` generates SQL based on the defined diagrams and can be executed directly in `pgAdmin 4`.

##### 💡 Solving the problem

The best way to avoid schema mismatch is to exclusively use the ORM for schema changes. However, based on the complicated set-up of an enterprise or application, following through with this solution can be challenging.

Some hacks can also be implemented to solve the problem. [`sqlacodegen`](https://pypi.org/project/sqlacodegen/) can read the existing structure of a database and generate SQLAlchemy model code.

#### 2. Object-Relational Impedance Mismatch

Object-Oriented Data and Relational-Oriented Data are two completely different ways to represent relationships between data. Therefore, some data relationships can be complicated to impossible to model in an object-oriented style.

Since Object-Relational Impedance Mismatch is a complicated topic, you can learn more from the video below
<center>
    <iframe
        width="560"
        height="315"
        src="https://www.youtube.com/embed/wg-NCF5KXNk" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen>
    </iframe>
</center>

## 🤔 When to use what?

Native SQL, Query builders and, ORMs all have their pros and cons. Choosing which interface to work with your database is up to your business's particular requirements and tech stack. The following guides can guide you to a suitable option.

### 👉 Choose Native SQL when

- [x] The application infrastructure is unstructured and small in scale.
- [x] The application needs fast data access.
- [x] The application only has access to parts of the database.
- [x] Constructing complicated queries that can not be translated into object mapping.
- [x] Brainstorming for ideas, and finding insights from data.

### 👉 Choose Query Builder when

- [x] The application is fairly structured.
- [x] The application contains repetitive and tedious queries.
- [x] The application needs dialects support.
- [x] The application wants to avoid SQL Injection.

### 👉 Choose ORM when

- [x] The application is medium to fairly large.
- [x] The developers need type safety for database access.
- [x] The application has modification access to the database schema.
- [x] Similar services can use the same ORM schema file.
- [x] The application wants to avoid SQL Injection.
- [x] The application is a full-stack project.

## How did I use an ORM to build this website?

ORM is incredible for small to medium-scale applications like my website since getting it up and running is straightforward and intuitive.

My backend, written in `Typescript`, has full access to the database in development. It makes my life so much easier when brainstorming and finding a good table structure to store my data in.

Since my application checks most of the boxes for using an ORM, I chose `Prisma` to be my database interaction method for this project.

Check out how I used `Prisma` on Github:
<https://github.com/nathan20021/summer-portfolio/tree/main>

### Credits

[1. Prisma on Raw SQL, Query Builder, and ORMs](https://www.prisma.io/dataguide/types/relational/comparing-sql-query-builders-and-orms)

[2. Quick Video between Raw SQL, Query Builder, and ORMs](https://www.youtube.com/watch?v=x1fCJ7sUXCM)
