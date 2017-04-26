-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: 2017-04-26 15:50:02
-- 服务器版本： 10.1.13-MariaDB
-- PHP Version: 5.6.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `forum`
--

-- --------------------------------------------------------

--
-- 表的结构 `artcle`
--

CREATE TABLE `artcle` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `author` char(40) NOT NULL,
  `title` char(40) NOT NULL,
  `content` text NOT NULL,
  `created_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `artcle`
--

INSERT INTO `artcle` (`id`, `user_id`, `author`, `title`, `content`, `created_time`) VALUES
(26, 1018, 'asdasd', '第一篇文章哦', '<h3 id="this-artcle-told-some-one-how-to-use-markdown-">This artcle told some one how to use MarkDown.</h3><ol><li>You can use the #123 or ###123 to set font size.</li><li>You can use the "1." or "2." or "*." to make list like now.<h3 id="-">-------------------------------------------------------------</h3><code>This is a code area.</code><blockquote><p>This is a tab.<br>More about Mardown can search "markdown".</p></blockquote></li></ol>', '2016-08-26 23:51:55'),
(27, 1018, 'asdasd', '再来一发', '<h1 id="test">Test</h1><h2 id="test">Test</h2><h3 id="test-br-">Test<br></h3><p><br></p><h4 id="test">Test</h4>', '2016-08-26 23:56:30'),
(29, 1018, 'asdasd', 'test', '<h2 id="123111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111">123111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111</h2>', '2016-08-27 00:04:56'),
(30, 1018, 'asdasd', '秦阿房宫部分股份清分', '温柔放入被4广告43好吧访问上帝', '2016-08-27 00:42:23'),
(31, 1018, 'asdasd', '秦阿房宫部分股份清分', '温柔放入被4广告43好吧访问上帝', '2016-08-27 00:42:45'),
(32, 1019, 'qweqwe', 'MarkDown教程', '<h2 id="-markdown-">这篇文章告诉你如何使用MarkDown。</h2><h3 id="-markdown-">这篇文章告诉你如何使用MarkDown。</h3><h4 id="-markdown-">这篇文章告诉你如何使用MarkDown。</h4><h5 id="-markdown-">这篇文章告诉你如何使用MarkDown。</h5><p>MarkDown有特定的语法，来生成特定的格式，比如这个列表:</p><ul><li>星号可以构建一个列表</li><li>像这样子</li><li>每个星号都会变成一个列表行头的提示</li></ul><h3 id="-">也可以生成表格，像这样:</h3><table><thead><tr><th>Tables</th><th style="text-align:center">Are</th><th style="text-align:right">Cool</th></tr></thead><tbody><tr><td>col 3 is</td><td style="text-align:center">right-aligned</td><td style="text-align:right">$1600</td></tr><tr><td>col 2 is</td><td style="text-align:center">centered</td><td style="text-align:right">$12</td></tr><tr><td>zebra stripes</td><td style="text-align:center">are neat</td><td style="text-align:right">$1</td></tr></tbody></table><h3 id="-">如果你是程序员，还可以生成代码库:</h3><h3 id="-">分割线</h3><hr>', '2016-11-13 21:24:10');

-- --------------------------------------------------------

--
-- 表的结构 `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `account` char(40) NOT NULL,
  `password` char(40) NOT NULL,
  `md5_key` char(40) NOT NULL,
  `crete_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `user`
--

INSERT INTO `user` (`id`, `account`, `password`, `md5_key`, `crete_time`) VALUES
(1018, 'asdasd', 'asdasd', '5b869ab955017b9f81fad898567eda2a', '2016-08-24 14:07:21'),
(1019, 'qweqwe', 'qweqwe', 'a4fc25bbe0e7083d3f17515464d234f4', '2016-11-13 13:00:54');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `artcle`
--
ALTER TABLE `artcle`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_ID` (`user_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `account` (`account`);

--
-- 在导出的表使用AUTO_INCREMENT
--

--
-- 使用表AUTO_INCREMENT `artcle`
--
ALTER TABLE `artcle`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;
--
-- 使用表AUTO_INCREMENT `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1020;
--
-- 限制导出的表
--

--
-- 限制表 `artcle`
--
ALTER TABLE `artcle`
  ADD CONSTRAINT `FK_ID` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
