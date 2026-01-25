import { useEffect, useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate, Link } from 'react-router-dom';
import { ArrowLeft, Play, Pause, RotateCcw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// The 500 billionaire names extracted from the document
const billionaireNames = [
  "HUI KA YAN", "ANIL AMBANI", "EIKE BATISTA", "SAM BANKMAN-FRIED", "MIKHAIL KHORDORKOVSKY",
  "ELIZABETH HOLMES", "BERNARD EBBERS", "RENE BENKO", "SEAN QUINN", "AUBREY MCLEDON",
  "ALLEN STANFORD", "VIJAY MALLYA", "BJORGOLFUR GUDMUNDSSON", "PATRICIA KLUGE", "RYAN BRESLOW",
  "KANYE WEST (YE)", "NICOLAS PUECH", "SARA LIU", "DAVID GREEN", "KOO BON-SIK",
  "JONATHAN ORINGER", "ROY VAGELOS", "ROBERT PEUGEOT", "MARIE-HÉLÈNE PEUGEOT-RONCORONI", "MANNY STUL",
  "RAMESHCHANDRA JAIN", "JAMES PENG", "FERNANDO MASAVEU HERRERO", "SHUNSAKU SAGAMI", "CANDIDO PINHEIRO KOREN DE LIMA",
  "SOMPHOTE AHUNAI", "CHRIS ELLISON", "JOCELYN WILDENSTEIN", "CHUCK FEENEY", "BILL HWANG",
  "BERNIE MADOFF", "ISABEL DOS SANTOS", "OLEV TINKOV", "RAJ RAJARATNAM", "YOSHIAKI TSUTSUMI",
  "HENADIY BOHOLYUBOV", "ILHOR KOLOMOISKY", "SUBHASH CHANDRA", "SHIVINDER MOHAN SINGH", "MALVINDER MOHAN SINGH",
  "NIRAV MODI", "MEHULKUMAR CHOKSI", "RAMESH SUNNY BALWANI", "TIM BLIXSETH", "MICHAEL PEARSON",
  "B.R. SHETTY", "V.G. SIDDHARTHA", "JOHN FOLEY", "ADAM NEUMANN", "ABIGAIL BENNETT",
  "ALBERTO CORTINA", "ANANT ASAVABHOKHIN", "ANDRES BZUROVSKI BAY", "ANNE WENINGHAUS", "ANTONIO LUIZ SEABRA",
  "ASHOK KAJARIA", "BAHARI KARIM", "BENEDICTE FIND", "BENNY SUHERMAN", "BERNARD CHARLES",
  "CANDIDO PINHEIRO KOREN DE LIMA & FAMILY", "CARLOS EDUARDO M. SCRIPILLITI", "CARLOS PIRES OLIVEIRA DIAS", "CATHERINE LOZICK", "CHARLES DOLAN & FAMILY",
  "CHARLES GIBBON", "CLOVIS ERMIRIO DE MORAES", "DAVID BONDERMAN", "DAVID GREEN & FAMILY", "DENIS FROLOV",
  "DHARMESH SHAH", "EDWIN SOERYADJAYA", "FRANCESCO SAPUTO", "FUNG VICTOR", "GARY FRIEDMAN",
  "GYORGY GATTYAN", "HAOYU CAI", "HONG SEOK-JOH", "HUA SHEN", "HUGO RIBEIRO & FAMILY",
  "IVAN MULLER BOTELHO", "JAMES TRUCHARD", "JEAN MADAR", "JENNY LINDEN URNES", "JIANG JINHUA",
  "JOAO ALVES DE QUEIROZ FILHO", "JOSE E. FELICIANO", "JUAN MARIA RIBERAS MERA", "KAZUO OKADA", "KEEREE KANJANAPAS",
  "KEIICHI SHIBAHARA", "KENNETH TUCHMAN", "KEVIN PLANK", "KIKI BARKI", "KIM JAE-YOUNG",
  "KIM JUNG-WOONG", "LEE HO-JIN", "LEE SHAU KEE", "LI SZE LIM", "LING BIN",
  "LIVIA VOIGT", "LUCIA MAGGI & FAMILY", "MAHAVEER PRASAD TAPARIA", "MARIA CONSUELO DIAS BRANCO", "MARIA FRIAS",
  "MARIE-HELENE PEUGEOT-RONCORONI & FAMILY", "MEHMET AYDINLAR", "MIAO YOUNJUN", "NIKHIL MERCHANT", "NIRANJAN HIRANANDANI",
  "NITI OSATHANUGRAH", "PAVEL GOLUBKOV", "PETER-ALEXANDER WACKER", "PHILLIPE BENACIN", "PINCKAERS FABIEN",
  "PRACHAK TANGKARAVAKOON", "PRADEEP RATHOD", "PRADIP BURMAN", "QU MIRANDA", "RAHUL GAUTAM",
  "REGINA HELENA S. VELLOSO", "RICHARD YUENGLING JR. & FAMILY", "ROBERT LANGER", "ROBERT PEUGEOT & FAMILY", "ROY MANN",
  "SCOTT WATTERSON", "SEHAT SUTARDJA", "SELCUK BAYRAKTAR", "SERGIO FOGEL", "SHASHISHEKAR PANDIT",
  "SHAY BANNON", "SHI YIFENG", "SHIVRATAN TAPARIA", "STANLEY MOTTA", "SU SUYU & FAMILY",
  "SUMET JIARAVANON", "THONGMA VIJITPONGPUN", "TIMOTHY SPRINGER", "TORY BURCH", "TRAN BA DUONG",
  "TSENG CHENG", "TSENG SING-AI", "VANICH CHAIYAWAN", "VICENTE BOLUDA FOS", "VIJAY AGARWAL",
  "VIRENDRA MHAISKAR", "VLADISLAV SVIBLOV", "WAN LONG", "WANG JIANYI", "WEN PENGCHENG & FAMILY",
  "WERNER O. WEBER", "WIJONO TANOKO", "WILLIAM BELO", "WU XUBO", "WU YULAN",
  "XIE BINGKUN", "YANG TINGDONG", "YI XIANZHONG", "YOGESH KOTHARI", "YU FAXIANG",
  "ZACHARY STERN", "ZHANG HONG", "ZHANG YUBAI", "ZHENG FAN", "ZHOU JUNJIE",
  "ZHU YIWEN & FAMILY", "ALEXANDER NESIS", "ANA MARIA BRESCIA CAFFERATA", "ANANDA KRISHNAN", "ANATOLY LOMAKIN",
  "ANNE MARIE SEE PASTOR", "ANNE WERNINGHAUS", "BAI BAOKUN", "BAI HOUSHAN", "BO WU",
  "CAO KEJIAN", "CARLOS RODRIGUEZ-PASTOR", "CHATCHAI KAEWBOOTTA", "CHEN BAOHUA", "CHEN XIANBAO",
  "CHEN XUELING", "CHEN YING", "CHENG ANTARES", "CHENG LILI", "CHENG XIANFENG",
  "CHING BOR TUNG", "CHUANHUA & FAMILY", "DAVID TRAN & FAMILY", "DENG YINGZHONG", "DIANA TEH LI SHING",
  "DIAO ZHIZHONG", "DING SHUI PO", "DU YULIN & FAMILY", "FARHAD EBRAHIMI", "FENG YUXIA",
  "FENGLUAN LI", "FU MINGKANG & FAMILY", "GANG CHEN", "GARY LAUDER", "GEORGE PASTOR",
  "GEORGE SAKELLARIS", "GHAN DJOE HIANG", "GUAN YIHONG", "GUO ZHENYU & FAMILY", "HANG HONG",
  "HARI KRISHNAN AGARWAL", "HE ZHIPING", "HEDDA IM BRAHM-DROEGE", "HOI KIN HONG", "HU GENGXI & FAMILY",
  "HUANG JINXIANG & FAMILY", "HUANG MIN", "IHOR KOLOMOYSKYY", "INIGO ZOBEL", "ISAK ANDIC & FAMILY",
  "JAMES IRSAY", "JIANG GUITING & FAMILY", "JIANMING GENG", "JIANPING LAI", "JIANXING CHE",
  "JIANYI WANG", "JOHN RUIZ", "JUNJIN WANG", "KAI WU", "KANGBAO KE & FAMILY",
  "KAPENG ZHANG", "KE YUNFENG & FAMILY", "KIM CHANG-SOO", "KISHORE MARIWALA", "KONG JIAN MIN",
  "LANCE GOKONGWEI", "LARS WINGEFORS", "LEE JONG-KEUN", "LI DENGHAI", "LI RUIQIANG",
  "LI WA", "LI YONGQING", "LI YONGXIN", "LIANGZHI XIE & FAMILY", "LIU BAOLIN",
  "LIYING CHEN", "LONG JIANG", "LOO CHOON YONG", "LU RONGFU", "LU YONGHUA & FAMILY",
  "MA XIUHUI", "MARCELO KALIM", "MARTIN SELIG", "MARVY FINGER", "MASARU WASAMI",
  "MASAYUKI ISHIHARA", "MIAO SHOULIANG", "MIAO YONGJUN", "OSMAN KIBAR", "PAN LONGQUAN",
  "POLLYANNA CHU", "PU ZHONGJIE & FAMILY", "PYOTR KONDRASHEV", "RANDAL NARDONE", "RAVEENDRAN BYJU",
  "ROHIQA CYRUS MISTRY", "RUSS WEINER", "SEIFEDDIN RUSTAMOV", "SHANG XIAOBO & FAMILY", "SHAO JIANXIONG",
  "STEFAN PIERER", "SUBHASH RUNWAL", "TANG BINSEN", "TANG RUI", "TINGDONG YANG",
  "TRAN BA DUONG & FAMILY", "TUNG CHING SAI", "TURGAY CINER", "VONNARAT TANGKARAVAKOON", "WALTER FARIA",
  "WAN FENG & FAMILY", "WANG FUJI", "WANG HAN", "WANG JIANGUO", "WANG REN SHENG",
  "WEIMEN DU", "WENJUN DA", "WILLIAM LI", "WU CHAOQUN", "WU YING",
  "WU YOUNGHUA", "XIA XINDE", "XIE BINGKUN & FAMILY", "XIE BINGZHENG & FAMILY", "XU BINGZHONG",
  "XU JIN", "YAN JANE & FAMILY", "YAN JUNXU", "YANG YUNYUN", "YANQIAO YE",
  "YE FAN & FAMILY", "YINTAI JIANG & FAMILY", "YU RONG", "YUAN LIPING", "YUBAI ZHANG",
  "YUEGUN TAO", "ZHANG CHUANWEI & FAMILY", "ZHANG GUIPING & FAMILY", "ZHANG XUEZHENG", "ZHAOBAI JIANG",
  "ZHEN LI & FAMILY", "ZHU XINGLIANG", "ALAN RYDGE", "ALEX ATALLAH", "ALEXANDER TEDJA",
  "ANANT ASAVABHOKIN", "ANDRE KOO SR.", "ANDREI GURIEV & FAMILY", "ANTON RABIE", "ASHOK BOOB",
  "ASHOK SOOTA", "AUSTIN RUSSELL", "BANG JUN-HYUK", "BAOKUN BAI", "BAOSHEN ZHONG",
  "BARRY SILBERT", "BETTY ANG", "BHAWARI BAI SURANA", "BORIS JORDAN", "BUI THANH NHON",
  "BYJU RAVEENDRAN", "DIVYA GOKULNATH", "CANDIDO PINHEIRO KOREN DE LIMA JUNIOR", "CHANCHAI RUAYRUNGRUANG", "CHANG BYUNG-GYU",
  "CHANG KUO-CHENG", "CHAOQUN WU", "CHARLES DUNSTONE", "CHE JIANXING", "CHEN GANG",
  "CHENGZHONG HU", "CHETAN DUBE", "CHO YOUNG-SIK", "CHRIS BRITT", "CHRIS XU",
  "CHUCHAT PETAUMPAI", "DAONAPA PETAMPAI", "CHUNG YONG-JIN", "DAI LIZHONG", "DALONG LV",
  "DASARI UDAY KUMAR REDDY", "DAVID GIROUARD", "DAVID HELGASON", "DAVID MCMURTRY", "DAVID PENALOZA ALANIS",
  "DENIS SVERDLOV", "DENNIS ANTHONY UY", "DEVIN FINZER", "DIRK STROEER", "DONALD HORTON & FAMILY",
  "DOUG CLARKE", "DU SHUANGHUA", "DULCE PUGLIESE DE GODOY BUENO", "EMILIO AZCARRAGA JEAN", "FAN MINHUA",
  "FAN ZHAOXIA & FAMILY", "FANG XIAOLIANG & FAMILY", "FAXIANG YU", "FU GANG", "GANG XU",
  "GARY WANG", "GENG JIANMING", "GLENN SANFORD", "GRANT PETTY", "GUO JIANGANG",
  "HAN WANG", "HEIDI HORTEN", "HENRIQUE DUBUGRAS", "HONGBO FANG", "HORST-OTTO GERBERDING",
  "HOUSHAN BAI", "HU KUN", "HUANG HONGYIN & FAMILY", "HUANG RULUN", "HUANG SHIH TSAI",
  "HUANG WEIBIN", "HUANG WENBIAO", "HUH JAE-MYUNG", "IGOR YUSUFOV", "JANE YAN & FAMILY",
  "JEAN-PAUL CLOZEL", "JENNY JUST", "JERRY NG", "JOACHIM ANTE", "JOHN KUSUMA",
  "JORGE PINHEIRO KORN DE LIMA", "KAVITA SINGHANIA", "KEJIAN CAO", "KERR NEILSON", "KIM DAE-IL",
  "KIM HYOUNG-NYON", "KIM NAM-JUNG", "KIM SANG-YEOL", "KUAN KAM HON & FAMILY", "LEE JOONG KEUN",
  "LEE SANG-RYUL", "LEE SEUNG-GUN", "LI TAN", "LI WENMEI & FAMILY", "LI YONGXIN & FAMILY",
  "LIANG JIANKUN & FAMILY", "LIN JIE & FAMILY", "LIU AISEN & FAMILY", "LIU QUAN", "LIU ZHONGTIAN & FAMILY",
  "LIUFA LI", "LOU BOLIANG", "LUIZA HELENA TRAJANO", "LUN RUIXIANG & FAMILY", "LV JIANMING",
  "LV YONGXIANG", "MARIA GRACE UY", "MARK HAOYONG YANG", "MARK REIN", "MASARU TANGE",
  "MATT HULSIZER", "MEGDET RAHIMKULOV & FAMILY", "MICHAEL MCCAIN", "MINGTONG CAI", "MUKAND LAL DUA",
  "MURDAYA POO", "PAN GANG", "PARK KWAN-HO", "PEDRO FRANCESCHI", "PEDRO DE GODOY BUENO",
  "PENGCHENG WEN & FAMILY", "QIAN XIAOJUN", "QIU ZIXIN", "RADHE SHYAM GOENKA", "RAJ KUMAR",
  "KISHIN RK", "RAMESH CHANDRA SHARMA", "RAMESH GENOMAL", "RAMESH KUMAR DUA", "REN ZHENGFEI",
  "RENATE SICK-GLASER", "RIJU RAVEENDRAN", "ROBERTO ONGPIN", "RONGFU LU", "RONNEN HARARY",
  "ROY CHI PING CHUNG", "RUIQING TAN", "SEBASTIAN SIEMIATKOWSKI", "SHAO ZENGMING", "SHINTARO YAMADA",
  "SHOULIANG MIAO", "SHUM CHIU HUNG & FAMILY", "SHUSHENG ZHENG", "SOICHIRO FUKUTAKE", "SONG CHI HYUNG",
  "STEFANIA TRIVA", "SUN HONGBIN", "SUNDER GENOMAL", "SUSANTO SUWARTO", "SUSUMU FUJITA",
  "SUYU SU & FAMILY", "TIANJIANG JIA & FAMILY", "TODD MCKINNON", "TONG JINQUAN", "TUNG CHING BOR",
  "UDO MUELLER", "VICTOR JACOBSSON", "VIVIEN CHEN", "WANG JIAN", "WANG QINGHUA",
  "WANG REN-SHENG", "WANG SHUMIN", "WANG ZHENTAO & FAMILY", "WEIGUO ZHAO", "WEIMIN DU",
  "WENBIAO WANG", "WENJUN DAI", "WILBUR ED BOSARGE JR.", "WILLIAM HOCKEY", "WOLFGANG EGGR",
  "WU PEIFU & FAMILY", "WU YONGHUA", "WU ZHENXING", "XIANBAO CHEN & FAMILY", "XIONG JUN & FAMILY",
  "XIONG SHAOMING", "XUEJING LIU & FAMILY", "YANG ERZHU", "YANG JIAN", "YANG JIANLIANG & FAMILY",
  "YAO LIANGBO", "YE YANQIAO", "YI XIANZHONG & FAMILY", "YOSHIKAZU TANAKA", "YUEQUEN TAO"
];

export default function PopulateDatabase() {
  const { user, isEditor, loading: authLoading } = useAuth();
  const { toast } = useToast();
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentName, setCurrentName] = useState('');
  const [processed, setProcessed] = useState(0);
  const [errors, setErrors] = useState<string[]>([]);
  const [logs, setLogs] = useState<string[]>([]);
  const isPausedRef = useRef(false);
  const isProcessingRef = useRef(false);
  const [hasExternalLock, setHasExternalLock] = useState(false);

  // Prevent multiple tabs/windows from running the population simultaneously (which quickly triggers 429s)
  const lockKey = 'fallen500_population_lock_v1';
  const lockIdRef = useRef(`lock_${Math.random().toString(36).slice(2)}`);

  const readLock = (): { id: string; ts: number } | null => {
    const raw = localStorage.getItem(lockKey);
    if (!raw) return null;
    try {
      return JSON.parse(raw);
    } catch {
      return null;
    }
  };

  const isLockStale = (lock: { id: string; ts: number }) => Date.now() - lock.ts > 15 * 60_000; // 15 min

  const refreshOwnLock = () => {
    localStorage.setItem(lockKey, JSON.stringify({ id: lockIdRef.current, ts: Date.now() }));
  };

  const acquireLock = () => {
    const lock = readLock();
    if (lock && !isLockStale(lock) && lock.id !== lockIdRef.current) return false;
    refreshOwnLock();
    setHasExternalLock(false);
    return true;
  };

  const releaseLock = () => {
    const lock = readLock();
    if (lock?.id === lockIdRef.current) {
      localStorage.removeItem(lockKey);
    }
    setHasExternalLock(false);
  };

  const syncExternalLockState = () => {
    const lock = readLock();
    if (!lock) {
      setHasExternalLock(false);
      return;
    }
    if (isLockStale(lock)) {
      // Clean up stale lock
      localStorage.removeItem(lockKey);
      setHasExternalLock(false);
      return;
    }
    setHasExternalLock(lock.id !== lockIdRef.current);
  };

  useEffect(() => {
    syncExternalLockState();
    const onStorage = (e: StorageEvent) => {
      if (e.key === lockKey) syncExternalLockState();
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (authLoading) return <div className="p-8">Loading...</div>;
  if (!user || !isEditor) return <Navigate to="/auth" replace />;

  const addLog = (message: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setLogs(prev => [`[${timestamp}] ${message}`, ...prev.slice(0, 99)]);
  };

  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  const clearDatabase = async () => {
    addLog('Clearing existing entries...');
    const { error } = await supabase.from('fallen_billionaires').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    if (error) {
      addLog(`Error clearing database: ${error.message}`);
      throw error;
    }
    addLog('Database cleared successfully');
  };

  const processName = async (name: string, rank: number, retryCount = 0): Promise<boolean> => {
    const maxRetries = 8;

    // Keep the lock fresh while running
    if (isProcessingRef.current) refreshOwnLock();

    addLog(`Processing ${rank}/${billionaireNames.length}: ${name}${retryCount > 0 ? ` (retry ${retryCount})` : ''}`);

    let invokeResult:
      | { data: any; error: { message?: string } | null }
      | undefined;

    try {
      invokeResult = await supabase.functions.invoke('generate-billionaire-data', {
        body: { name, rank },
      });
    } catch (e: any) {
      // Some errors may be thrown directly; normalize into a message
      invokeResult = { data: null, error: { message: e?.message ?? 'Unknown error' } };
    }

    const invokeErrorMsg = invokeResult?.error?.message ?? '';
    const isRateLimited = invokeErrorMsg.includes('429') || invokeErrorMsg.toLowerCase().includes('rate limited');

    if (invokeResult?.error) {
      if (isRateLimited && retryCount < maxRetries) {
        // Exponential backoff with a cap (up to 10 minutes)
        const waitTime = Math.min(10 * 60_000, Math.pow(2, retryCount + 1) * 30_000);
        addLog(`⏳ Rate limited, waiting ${Math.round(waitTime / 1000)}s before retry...`);
        await delay(waitTime);
        return processName(name, rank, retryCount + 1);
      }

      if (isRateLimited) {
        // If we're still rate-limited after retries, stop cleanly instead of spamming requests.
        addLog('⛔ Still rate limited after multiple retries. Pausing the run.');
        toast({
          title: 'Rate limited',
          description: 'Please wait a few minutes and click Start again to continue.',
          variant: 'destructive',
        });
        isPausedRef.current = true;
        setIsRunning(false);
        return false;
      }

      const errorMsg = `✗ Failed: ${name} - ${invokeErrorMsg || 'Unknown error'}`;
      addLog(errorMsg);
      setErrors(prev => [...prev, errorMsg]);
      return false;
    }

    const data = invokeResult?.data;
    if (!data) {
      const errorMsg = `✗ Failed: ${name} - No data returned`;
      addLog(errorMsg);
      setErrors(prev => [...prev, errorMsg]);
      return false;
    }

    if (data.error) {
      const msg = String(data.error);
      const dataRateLimited = msg.includes('429') || msg.toLowerCase().includes('rate limited');
      if (dataRateLimited && retryCount < maxRetries) {
        const waitTime = Math.min(10 * 60_000, Math.pow(2, retryCount + 1) * 30_000);
        addLog(`⏳ Rate limited, waiting ${Math.round(waitTime / 1000)}s before retry...`);
        await delay(waitTime);
        return processName(name, rank, retryCount + 1);
      }
      const errorMsg = `✗ Failed: ${name} - ${msg}`;
      addLog(errorMsg);
      setErrors(prev => [...prev, errorMsg]);
      return false;
    }

    // Insert into database
    const { error: insertError } = await supabase.from('fallen_billionaires').insert({
      name: data.name,
      rank: data.rank,
      peak_net_worth: data.peak_net_worth,
      current_net_worth: data.current_net_worth,
      country: data.country,
      industry: data.industry,
      summary: data.summary,
      key_factors: data.key_factors,
      key_timelines: data.key_timelines,
      current_status: data.current_status,
      lessons_learned: data.lessons_learned,
      featured: data.featured,
      published: data.published,
    });

    if (insertError) {
      const errorMsg = `✗ Failed: ${name} - Insert failed: ${insertError.message}`;
      addLog(errorMsg);
      setErrors(prev => [...prev, errorMsg]);
      return false;
    }

    addLog(`✓ Added: ${name} (Peak: $${data.peak_net_worth}B)`);
    return true;
  };

  const startPopulation = async () => {
    // Prevent double-clicks / multiple concurrent runs
    if (isProcessingRef.current) {
      addLog('A population run is already active. Please wait for it to finish.');
      return;
    }

    if (hasExternalLock) {
      addLog('Another tab/window is already running a population job. Close it or wait for it to finish.');
      toast({
        title: 'Another run detected',
        description: 'Only one population job can run at a time.',
        variant: 'destructive',
      });
      return;
    }

    if (!acquireLock()) {
      syncExternalLockState();
      addLog('Could not start: another tab/window appears to be running this already.');
      return;
    }

    isProcessingRef.current = true;
    setIsRunning(true);
    isPausedRef.current = false;
    setErrors([]);
    
    try {
      // Clear existing data first
      await clearDatabase();
      
      setProcessed(0);
      setProgress(0);
      
      for (let i = 0; i < billionaireNames.length; i++) {
        if (isPausedRef.current) {
          addLog('Process paused by user');
          break;
        }
        
        const name = billionaireNames[i];
        setCurrentName(name);
        
        await processName(name, i + 1);

        if (isPausedRef.current) {
          addLog('Run paused.');
          break;
        }
        
        setProcessed(i + 1);
        setProgress(((i + 1) / billionaireNames.length) * 100);
        
        // Add delay between requests to help avoid rate limiting
        await delay(10000);
      }
      
      addLog('Population complete!');
      toast({
        title: "Complete",
        description: `Processed ${processed} entries`,
      });
    } catch (error: any) {
      addLog(`Fatal error: ${error.message}`);
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      isProcessingRef.current = false;
      releaseLock();
      setIsRunning(false);
    }
  };

  const pausePopulation = () => {
    isPausedRef.current = true;
    setIsRunning(false);
    addLog('Pausing...');
  };

  const resetState = () => {
    setProgress(0);
    setProcessed(0);
    setCurrentName('');
    setErrors([]);
    setLogs([]);
    isPausedRef.current = false;
    releaseLock();
  };

  return (
    <div className="container py-8 max-w-4xl">
      <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6">
        <ArrowLeft className="h-4 w-4" />
        Back to Home
      </Link>

      <Card>
        <CardHeader>
          <CardTitle>Populate 500 Billionaires Database</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {hasExternalLock && (
            <div className="text-sm text-muted-foreground">
              Another tab/window is currently running a population job. Close it or wait for it to finish.
            </div>
          )}
          <div className="flex gap-4">
            {!isRunning ? (
              <Button onClick={startPopulation} className="gap-2" disabled={hasExternalLock}>
                <Play className="h-4 w-4" />
                Start Population
              </Button>
            ) : (
              <Button onClick={pausePopulation} variant="outline" className="gap-2">
                <Pause className="h-4 w-4" />
                Pause
              </Button>
            )}
            <Button onClick={resetState} variant="outline" className="gap-2" disabled={isRunning}>
              <RotateCcw className="h-4 w-4" />
              Reset
            </Button>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progress: {processed} / {billionaireNames.length}</span>
              <span>{progress.toFixed(1)}%</span>
            </div>
            <Progress value={progress} />
            {currentName && (
              <p className="text-sm text-muted-foreground">Currently processing: {currentName}</p>
            )}
          </div>

          {errors.length > 0 && (
            <div className="bg-destructive/10 p-4 rounded-lg">
              <h4 className="font-medium text-destructive mb-2">Errors ({errors.length})</h4>
              <div className="max-h-32 overflow-y-auto text-sm text-destructive">
                {errors.map((err, i) => (
                  <div key={i}>{err}</div>
                ))}
              </div>
            </div>
          )}

          <div className="bg-muted p-4 rounded-lg">
            <h4 className="font-medium mb-2">Activity Log</h4>
            <div className="max-h-64 overflow-y-auto text-sm font-mono space-y-1">
              {logs.length === 0 ? (
                <p className="text-muted-foreground">Waiting to start...</p>
              ) : (
                logs.map((log, i) => (
                  <div key={i} className={log.includes('✗') ? 'text-destructive' : log.includes('✓') ? 'text-green-600' : ''}>
                    {log}
                  </div>
                ))
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
