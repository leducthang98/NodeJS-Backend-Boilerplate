export default {
    PORT: process.env.SERVER_PORT || 8080,
    MYSQL_URL: process.env.MYSQL_URL || 'mysql://root:codedidungso.me@localhost:3306/default',
    JWT_SECRET: process.env.JWT_SECRET || 'leducthang98',
}