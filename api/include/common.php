<?php 
//header("Content-Type:text/html; charset=UTF-8");
header("Content-Type:application/json; charset=UTF-8");
session_cache_limiter(false);
session_start();
date_default_timezone_set('Asia/Chongqing');

// Debug Mode
if (defined('DEBUG')) {
    error_reporting(E_ALL);
    ini_set('display_errors', '1');
}

// Redis configuration
$redis_conf = array(
    'TTL_WEEK'  => 7 * 24 * 3600,
    'TTL_DAY'   => 24 * 3600,
    'TTL_SHORT' => 45 * 60,
);

// 连接PDO
function getConnection() {
    $dbhost="127.0.0.1";
    $dbuser="root";
    $dbpass="xhtest@2016,";
    $dbname="xihaxueche";
    $dbh = new PDO("mysql:host=$dbhost;dbname=$dbname", $dbuser, $dbpass, array(PDO::ATTR_PERSISTENT => true));
    //$dbh = new PDO("mysql:host=$dbhost;dbname=$dbname", $dbuser, $dbpass);
        /*
        try {
            $dbh = new PDO("mysql:host=$dbhost;dbname=$dbname", $dbuser, $dbpass);
        } catch ( PDOException $e ) {
            setapilog('[getConnection] [:error] [' . $e->getLine() . ' ' . $e->getMessage() . ']');
            exit(json_encode(array('code' => 1, 'data' => '网络错误')));
        }
         */
    $dbh->exec("SET NAMES 'UTF8'");
    $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    return $dbh;
} /* for PDO getConnection() */

//连接Redis
function getRedisConnection() {
    $redis_host = "127.0.0.1";
    $redis_port = "6379";
    if (!extension_loaded('redis')) {
        return false;
    }
    try {
        $redis = new Redis();
        $redis->connect($redis_host, $redis_port);
        if ($redis->ping()) {
            return $redis;
        } else {
            return false;
        }
    } catch (RedisException $e) {
        return false;
    }
} /* for Redis getRedisConnection() */
define('ROOT', realpath('../../../') . '/');
define('DBPREFIX', 'cs_');
define('MOBILEPATH', '../m/');
define('S_HTTP_HOST', 'http://192.168.100.69/sadmin/');
define('HTTP_HOST', 'http://192.168.100.69/admin/');
define('HOST', 'http://192.168.100.69/');
define('SHOST', 'http://192.168.100.69/');
define('HOST_URL', 'http://192.168.100.69/');
define('USE_JSON_BIGINT_AS_STRING',(!version_compare(PHP_VERSION,'5.5', '>=') and defined('JSON_BIGINT_AS_STRING')));


// 教练端测试
define('APPKEYS', '3ebbbf7c2e811171a6e5c836');
define('MASTERSECRET', 'b4272f005b740f30d49a6758');

// api错误日志记录
function setapilog($word='') {
    $fp = fopen("apilog.txt","a");
    flock($fp, LOCK_EX) ;
    //fwrite($fp,"执行日期：".strftime("%Y%m%d%H%M%S",time()+8*3600)."\n".$word."\n");
    fwrite($fp,"执行日期：".date('Y-m-d H:i:s', time())."\n".$word."\n");
    flock($fp, LOCK_UN);
    fclose($fp);
}

// 配置驾照类型 
$lisence_config = array(
    '1' => 'C1',
    '2' => 'C2',
    '3' => 'C5',
    '4' => 'A1',
    '5' => 'A2',
    '6' => 'B1',
    '7' => 'B2',
    '8' => 'D',
    '9' => 'E',
    '10' => 'F'
);

// 配置科目类型
$lesson_config = array(
    // '1' => '科目一',
    '2' => '科目二',
    '3' => '科目三',
    // '4' => '科目四'
);

?>
