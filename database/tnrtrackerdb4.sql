-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 06-06-2020 a las 03:53:49
-- Versión del servidor: 10.4.11-MariaDB
-- Versión de PHP: 7.4.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `tnrtrackerdb4`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `barcos`
--

CREATE TABLE `barcos` (
  `idbarcos` int(11) NOT NULL,
  `barconombre` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `barcos_has_cargo`
--

CREATE TABLE `barcos_has_cargo` (
  `barcos_idbarcos` int(11) NOT NULL,
  `cargo_idcargo` int(11) NOT NULL,
  `cargo_usuario_idusuario` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `bitacora`
--

CREATE TABLE `bitacora` (
  `id_Bitacora` int(11) NOT NULL,
  `username_bitacora` varchar(80) NOT NULL,
  `accion` varchar(85) NOT NULL,
  `name_table` varchar(45) NOT NULL,
  `data_new` varchar(255) NOT NULL,
  `data_old` varchar(255) NOT NULL,
  `date_Bitacora` timestamp(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `session_bitacora` blob NOT NULL,
  `Bitacoracol` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `captcha`
--

CREATE TABLE `captcha` (
  `id_captcha` int(11) NOT NULL,
  `captcha_img` blob DEFAULT NULL,
  `correct` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cargo`
--

CREATE TABLE `cargo` (
  `idcargo` int(11) NOT NULL,
  `nivel` varchar(45) DEFAULT NULL,
  `usuario_idusuario` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `category`
--

CREATE TABLE `category` (
  `id_category` int(11) NOT NULL,
  `name_cat` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `crew`
--

CREATE TABLE `crew` (
  `id_crew` int(11) NOT NULL,
  `comandante` varchar(45) NOT NULL,
  `segundocomandante` varchar(45) DEFAULT NULL,
  `jefemaquinas` varchar(45) DEFAULT NULL,
  `maquinista` varchar(45) DEFAULT NULL,
  `timonel` varchar(45) DEFAULT NULL,
  `segtimonel` varchar(45) DEFAULT NULL,
  `crew` varchar(45) DEFAULT NULL,
  `crew2` varchar(45) DEFAULT NULL,
  `uuss_id_uuss` int(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `crew`
--

INSERT INTO `crew` (`id_crew`, `comandante`, `segundocomandante`, `jefemaquinas`, `maquinista`, `timonel`, `segtimonel`, `crew`, `crew2`, `uuss_id_uuss`) VALUES
(3, '', 'TF. Carlos Jose', 'Alf. Juan Rios', 'SO1. Pedro Rivas', 'SG1. Jose Saca', 'SO1. Pedro Parra', '', '', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `crew_has_title`
--

CREATE TABLE `crew_has_title` (
  `id_crew_title` int(11) NOT NULL,
  `crew_id_crew` int(11) NOT NULL,
  `title_id_title` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `crew_has_title`
--

INSERT INTO `crew_has_title` (`id_crew_title`, `crew_id_crew`, `title_id_title`) VALUES
(3, 3, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `links`
--

CREATE TABLE `links` (
  `id_links` int(11) NOT NULL,
  `title` varchar(45) DEFAULT NULL,
  `url` varchar(45) DEFAULT NULL,
  `descr` text DEFAULT NULL,
  `user_id` int(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `positions`
--

CREATE TABLE `positions` (
  `id_positions` int(11) NOT NULL,
  `latitud` varchar(45) DEFAULT NULL,
  `logitud` varchar(45) DEFAULT NULL,
  `tiempo` timestamp(6) NULL DEFAULT NULL,
  `positionscol` varchar(45) DEFAULT NULL,
  `tracker_id_tracker` int(20) NOT NULL,
  `tracker_uuss_id_uuss` int(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `seccion`
--

CREATE TABLE `seccion` (
  `id_seccion` int(11) NOT NULL,
  `start_seccion` timestamp(6) NULL DEFAULT NULL,
  `seccioncol` varchar(45) DEFAULT NULL,
  `user_id_user` int(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sessions`
--

CREATE TABLE `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int(11) UNSIGNED NOT NULL,
  `data` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `sessions`
--

INSERT INTO `sessions` (`session_id`, `expires`, `data`) VALUES
('ajfSL1cziiUQZe2fY_vvehBQ1AwTSL6m', 1591457198, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{},\"passport\":{\"user\":2}}');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `title`
--

CREATE TABLE `title` (
  `id_title` int(11) NOT NULL,
  `title` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `title`
--

INSERT INTO `title` (`id_title`, `title`) VALUES
(1, 'Administrador'),
(2, 'Gerente'),
(3, 'Agente Regional Trinidad'),
(4, 'Agente Regional Cochabamba');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `title_user`
--

CREATE TABLE `title_user` (
  `id_title_user` int(32) NOT NULL,
  `user_id_user` int(50) NOT NULL,
  `title_id_title` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `title_user`
--

INSERT INTO `title_user` (`id_title_user`, `user_id_user`, `title_id_title`) VALUES
(1, 1, 1),
(2, 2, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `title_uuss`
--

CREATE TABLE `title_uuss` (
  `id_title_uuss` int(11) NOT NULL,
  `title_id_title` int(11) NOT NULL,
  `uuss_id_uuss` int(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tracker`
--

CREATE TABLE `tracker` (
  `id_tracker` int(20) NOT NULL,
  `tracker_code` varchar(45) DEFAULT NULL,
  `tracker_cell_number` varchar(45) DEFAULT NULL,
  `tracker_obs` text DEFAULT NULL,
  `uuss_id_uuss` int(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int(50) NOT NULL,
  `username` varchar(46) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(100) NOT NULL,
  `create_time` timestamp NULL DEFAULT current_timestamp(),
  `first_name` varchar(45) DEFAULT NULL,
  `last_name` varchar(45) DEFAULT NULL,
  `api_token` int(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`, `create_time`, `first_name`, `last_name`, `api_token`) VALUES
(1, 'aaa', '', '$2a$10$ptq6h8t8UhttsDNzHmmlcOKw.qwdpB.1HH3Gw8dcumZRpYseLBSFu', '2020-06-05 07:58:09', '', '', NULL),
(2, 'ariel', '', '$2a$10$te43VQX93NUnXzfm6gql0.l6cW/eFCLlU4SSb5v8Z4gVS6QABcypS', '2020-06-05 08:01:04', 'aaa', '', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `idusuario` int(11) NOT NULL,
  `nombre` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `buques`
--

CREATE TABLE `buques` (
  `id_uuss` int(45) NOT NULL,
  `code_uuss` varchar(45) DEFAULT NULL,
  `name_uuss` varchar(45) DEFAULT NULL,
  `description` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `barcos`
--
ALTER TABLE `barcos`
  ADD PRIMARY KEY (`idbarcos`);

--
-- Indices de la tabla `barcos_has_cargo`
--
ALTER TABLE `barcos_has_cargo`
  ADD PRIMARY KEY (`barcos_idbarcos`,`cargo_idcargo`,`cargo_usuario_idusuario`),
  ADD KEY `fk_barcos_has_cargo_cargo1_idx` (`cargo_idcargo`,`cargo_usuario_idusuario`),
  ADD KEY `fk_barcos_has_cargo_barcos1_idx` (`barcos_idbarcos`);

--
-- Indices de la tabla `bitacora`
--
ALTER TABLE `bitacora`
  ADD PRIMARY KEY (`id_Bitacora`);

--
-- Indices de la tabla `captcha`
--
ALTER TABLE `captcha`
  ADD PRIMARY KEY (`id_captcha`);

--
-- Indices de la tabla `cargo`
--
ALTER TABLE `cargo`
  ADD PRIMARY KEY (`idcargo`,`usuario_idusuario`),
  ADD KEY `fk_cargo_usuario1_idx` (`usuario_idusuario`);

--
-- Indices de la tabla `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id_category`);

--
-- Indices de la tabla `crew`
--
ALTER TABLE `crew`
  ADD PRIMARY KEY (`id_crew`),
  ADD KEY `fk_crew_uuss1_idx` (`uuss_id_uuss`);

--
-- Indices de la tabla `crew_has_title`
--
ALTER TABLE `crew_has_title`
  ADD PRIMARY KEY (`id_crew_title`,`crew_id_crew`,`title_id_title`),
  ADD KEY `fk_crew_has_title_title1_idx` (`title_id_title`),
  ADD KEY `fk_crew_has_title_crew1_idx` (`crew_id_crew`);

--
-- Indices de la tabla `links`
--
ALTER TABLE `links`
  ADD PRIMARY KEY (`id_links`,`user_id`),
  ADD KEY `fk_links_user1_idx` (`user_id`);

--
-- Indices de la tabla `positions`
--
ALTER TABLE `positions`
  ADD PRIMARY KEY (`id_positions`,`tracker_id_tracker`,`tracker_uuss_id_uuss`),
  ADD KEY `fk_positions_tracker1_idx` (`tracker_id_tracker`,`tracker_uuss_id_uuss`);

--
-- Indices de la tabla `seccion`
--
ALTER TABLE `seccion`
  ADD PRIMARY KEY (`id_seccion`,`user_id_user`),
  ADD KEY `fk_seccion_copy1_user1_idx` (`user_id_user`);

--
-- Indices de la tabla `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`session_id`);

--
-- Indices de la tabla `title`
--
ALTER TABLE `title`
  ADD PRIMARY KEY (`id_title`);

--
-- Indices de la tabla `title_user`
--
ALTER TABLE `title_user`
  ADD PRIMARY KEY (`id_title_user`,`user_id_user`,`title_id_title`),
  ADD KEY `fk_title_user_user1_idx` (`user_id_user`),
  ADD KEY `fk_title_user_title1_idx` (`title_id_title`);

--
-- Indices de la tabla `title_uuss`
--
ALTER TABLE `title_uuss`
  ADD PRIMARY KEY (`id_title_uuss`,`title_id_title`,`uuss_id_uuss`),
  ADD KEY `fk_title_uuss_title1_idx` (`title_id_title`),
  ADD KEY `fk_title_uuss_uuss1_idx` (`uuss_id_uuss`);

--
-- Indices de la tabla `tracker`
--
ALTER TABLE `tracker`
  ADD PRIMARY KEY (`id_tracker`,`uuss_id_uuss`),
  ADD KEY `fk_tracker_uuss1_idx` (`uuss_id_uuss`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username_UNIQUE` (`username`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`idusuario`);

--
-- Indices de la tabla `buques`
--
ALTER TABLE `buques`
  ADD PRIMARY KEY (`id_uuss`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `bitacora`
--
ALTER TABLE `bitacora`
  MODIFY `id_Bitacora` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `captcha`
--
ALTER TABLE `captcha`
  MODIFY `id_captcha` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `category`
--
ALTER TABLE `category`
  MODIFY `id_category` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `crew`
--
ALTER TABLE `crew`
  MODIFY `id_crew` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `crew_has_title`
--
ALTER TABLE `crew_has_title`
  MODIFY `id_crew_title` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `positions`
--
ALTER TABLE `positions`
  MODIFY `id_positions` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `seccion`
--
ALTER TABLE `seccion`
  MODIFY `id_seccion` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `title`
--
ALTER TABLE `title`
  MODIFY `id_title` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `title_user`
--
ALTER TABLE `title_user`
  MODIFY `id_title_user` int(32) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `title_uuss`
--
ALTER TABLE `title_uuss`
  MODIFY `id_title_uuss` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `tracker`
--
ALTER TABLE `tracker`
  MODIFY `id_tracker` int(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `buques`
--
ALTER TABLE `buques`
  MODIFY `id_uuss` int(45) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `barcos_has_cargo`
--
ALTER TABLE `barcos_has_cargo`
  ADD CONSTRAINT `fk_barcos_has_cargo_barcos1` FOREIGN KEY (`barcos_idbarcos`) REFERENCES `barcos` (`idbarcos`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_barcos_has_cargo_cargo1` FOREIGN KEY (`cargo_idcargo`,`cargo_usuario_idusuario`) REFERENCES `cargo` (`idcargo`, `usuario_idusuario`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `cargo`
--
ALTER TABLE `cargo`
  ADD CONSTRAINT `fk_cargo_usuario1` FOREIGN KEY (`usuario_idusuario`) REFERENCES `usuario` (`idusuario`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `crew`
--
ALTER TABLE `crew`
  ADD CONSTRAINT `fk_crew_uuss1` FOREIGN KEY (`uuss_id_uuss`) REFERENCES `buques` (`id_uuss`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `crew_has_title`
--
ALTER TABLE `crew_has_title`
  ADD CONSTRAINT `fk_crew_has_title_crew1` FOREIGN KEY (`crew_id_crew`) REFERENCES `crew` (`id_crew`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_crew_has_title_title1` FOREIGN KEY (`title_id_title`) REFERENCES `title` (`id_title`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `links`
--
ALTER TABLE `links`
  ADD CONSTRAINT `fk_links_user1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `positions`
--
ALTER TABLE `positions`
  ADD CONSTRAINT `fk_positions_tracker1` FOREIGN KEY (`tracker_id_tracker`,`tracker_uuss_id_uuss`) REFERENCES `tracker` (`id_tracker`, `uuss_id_uuss`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `seccion`
--
ALTER TABLE `seccion`
  ADD CONSTRAINT `fk_seccion_copy1_user1` FOREIGN KEY (`user_id_user`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `title_user`
--
ALTER TABLE `title_user`
  ADD CONSTRAINT `fk_title_user_title1` FOREIGN KEY (`title_id_title`) REFERENCES `title` (`id_title`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_title_user_user1` FOREIGN KEY (`user_id_user`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `title_uuss`
--
ALTER TABLE `title_uuss`
  ADD CONSTRAINT `fk_title_uuss_title1` FOREIGN KEY (`title_id_title`) REFERENCES `title` (`id_title`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_title_uuss_uuss1` FOREIGN KEY (`uuss_id_uuss`) REFERENCES `buques` (`id_uuss`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `tracker`
--
ALTER TABLE `tracker`
  ADD CONSTRAINT `fk_tracker_uuss1` FOREIGN KEY (`uuss_id_uuss`) REFERENCES `buques` (`id_uuss`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
