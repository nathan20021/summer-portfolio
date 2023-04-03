#

## **Relational Database Interaction**

Using a relational database within a project is a common operation that all backend systems want to achieve. However, there are different methodologies to interact with a database via SQL.

Even though it's possible for a frontend application to directly interact with a remote database, it is considered poor security practice to do so. Therefore, in this blog, we will only talk about the interaction between the backend and remote relational databases.

### **Raw SQL**

Raw SQL can be considered the most fundamental and low-level interaction with an SQL database. Since SQL is an extremely powerful language, managing data within a database now becomes a string management problem.

For example, the backend can simply expose a `POST` endpoint to update customer data via the `UPDATE table ...` query.

In a python application, executing a raw SQL query can be as easy as

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

connection = create_db_connection(url, username, password, database) # Connect to the Database
execute_query(connection, create_blogs_table) # Execute our defined query
```

### **SQL Query Builder**

### **Object Relational Mapping**

## Recap

## When to use what?

### Credits

<!-- <center>
    <iframe
        width="560" height="315"
        src="https://www.youtube.com/embed/x1fCJ7sUXCM"
        title="YouTube video player" frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen>
    </iframe>
</center> -->