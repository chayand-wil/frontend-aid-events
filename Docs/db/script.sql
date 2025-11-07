
CREATE DATABASE spotify_old;

USE spotify_old;

-- ==========================
-- TABLA DE USUARIOS
-- ==========================
CREATE TABLE app_user (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    user_status ENUM('active','ban') NOT NULL
);

-- ==========================
-- GÉNEROS MUSICALES
-- ==========================
CREATE TABLE music_genre (
    id INT AUTO_INCREMENT PRIMARY KEY,
    description VARCHAR(100) NOT NULL,
    slug VARCHAR(100) NOT NULL UNIQUE
);

-- ==========================
-- ARTISTAS
-- ==========================
CREATE TABLE artist (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(150) NOT NULL
);

-- ==========================
-- TIPOS DE PUBLICACIÓN
-- ==========================
CREATE TABLE publication_type (
    id INT AUTO_INCREMENT PRIMARY KEY,
    description VARCHAR(100) NOT NULL
);

-- ==========================
-- PUBLICACIONES
-- ==========================
CREATE TABLE publication (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_publication_type INT,
    image VARCHAR(255),
    status ENUM('is_presale', 'available', 'hidden', 'sold_out') NOT NULL,
    audio VARCHAR(255),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (id_publication_type) REFERENCES publication_type(id)
);

-- ==========================
-- ARTÍCULOS
-- ==========================
CREATE TABLE article (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_publicacion INT,
    id_music_genre INT,
    id_artist INT,
    type ENUM('vinyl', 'cds', 'cassettes') NOT NULL,
    quantity INT,
    category ENUM('nuevo', 'semi-usado', 'usado', '7_plg', '8_plg','9_plg', 'special_edition') NOT NULL,
    price DECIMAL(10,2),
    color VARCHAR(50),
    publication_year YEAR,
    dimension_x DECIMAL(10,2),
    dimension_y DECIMAL(10,2),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (id_publicacion) REFERENCES publication(id),
    FOREIGN KEY (id_music_genre) REFERENCES music_genre(id),
    FOREIGN KEY (id_artist) REFERENCES artist(id)
);

-- ==========================
-- CANCIONES
-- ==========================
CREATE TABLE songs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_article INT,
    song_name VARCHAR(150),
    side ENUM('Lado_a','Lado_b') NOT NULL,
    FOREIGN KEY (id_article) REFERENCES article(id)
);

-- ==========================
-- WISHLIST
-- ==========================
CREATE TABLE wishlist (
    app_user_id INT,
    id_publication INT,
    PRIMARY KEY (app_user_id, id_publication),
    FOREIGN KEY (app_user_id) REFERENCES app_user(id),
    FOREIGN KEY (id_publication) REFERENCES publication(id)
);

-- ==========================
-- CALIFICACIONES
-- ==========================
CREATE TABLE rating (
    id INT AUTO_INCREMENT PRIMARY KEY,
    app_user_id INT,
    id_publication INT,
    score INT,
    FOREIGN KEY (app_user_id) REFERENCES app_user(id),
    FOREIGN KEY (id_publication) REFERENCES publication(id)
);

-- ==========================
-- ESTADOS DE COMENTARIO
-- ==========================
CREATE TABLE comment (
    id INT AUTO_INCREMENT PRIMARY KEY,
    app_user_id INT,
    id_publication INT,
    id_comment_status ENUM('visible','hidden','ban') NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (app_user_id) REFERENCES app_user(id),
    FOREIGN KEY (id_publication) REFERENCES publication(id)
);

-- ==========================
-- TIPOS DE PROMOCIÓN
-- ==========================
CREATE TABLE promotion_type (
    id INT AUTO_INCREMENT PRIMARY KEY,
    description VARCHAR(100) NOT NULL,
    discount DECIMAL(5,2),
    max_limit INT
);

-- ==========================
-- PROMOCIONES
-- ==========================
CREATE TABLE promotion (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_promotion_type INT,
    start_date DATETIME,
    end_date DATETIME,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (id_promotion_type) REFERENCES promotion_type(id)
);

-- ==========================
-- PROMOCIONES POR ARTÍCULO
-- ==========================
CREATE TABLE promotion_articles (
    id_article INT,
    id_promotion INT,
    PRIMARY KEY (id_article, id_promotion),
    FOREIGN KEY (id_article) REFERENCES article(id),
    FOREIGN KEY (id_promotion) REFERENCES promotion(id)
);

-- ==========================
-- EVENTOS
-- ==========================
CREATE TABLE event (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_artist INT,
    id_publication INT,
    title VARCHAR(150),
    start_date DATETIME,
    FOREIGN KEY (id_artist) REFERENCES artist(id),
    FOREIGN KEY (id_publication) REFERENCES publication(id)
);

-- ==========================
-- ASISTENCIA DE USUARIOS
-- ==========================
CREATE TABLE user_attendance (
    app_user_id INT,
    id_publication INT,
    PRIMARY KEY (app_user_id, id_publication),
    FOREIGN KEY (app_user_id) REFERENCES app_user(id),
    FOREIGN KEY (id_publication) REFERENCES publication(id)
);

-- ==========================
-- CHAT
-- ==========================
CREATE TABLE chat_comment (
    id INT AUTO_INCREMENT PRIMARY KEY,
    app_user_id INT,
    id_publication INT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (app_user_id) REFERENCES app_user(id),
    FOREIGN KEY (id_publication) REFERENCES publication(id)
);

-- ==========================
-- ORDENES
-- ==========================
CREATE TABLE `order` (
    id INT AUTO_INCREMENT PRIMARY KEY,
    app_user_id INT,
    id_publication INT,
    quantity INT,
    state ENUM('completed', 'shipped', 'ready_to_shipped') NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (app_user_id) REFERENCES app_user(id),
    FOREIGN KEY (id_publication) REFERENCES publication(id)
);

-- ==========================
-- NOTIFICACIONES
-- ==========================
CREATE TABLE notification (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(150),
    detail TEXT,
    app_user_id INT,
    id_publication INT,
    FOREIGN KEY (app_user_id) REFERENCES app_user(id),
    FOREIGN KEY (id_publication) REFERENCES publication(id)
);