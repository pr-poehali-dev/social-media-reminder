import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

const motivationalQuotes = [
  "Жизнь происходит за пределами экрана! 🌟",
  "Каждая минута оффлайн — это новая возможность! 💫",
  "Ты сильнее, чем бесконечный скролл! 💪",
  "Реальный мир ждёт твоего внимания! 🌈",
  "Твоё время — твоя суперсила! ⚡",
  "Сегодня ты управляешь временем, а не оно тобой! 🎯"
];

const achievements = [
  { id: 1, name: 'Первый шаг', icon: 'Footprints', description: 'Запустил трекинг времени', unlocked: true },
  { id: 2, name: 'Час свободы', icon: 'Clock', description: 'Не заходил в соцсети час', unlocked: true },
  { id: 3, name: 'День победы', icon: 'Trophy', description: 'Достиг дневной цели', unlocked: true },
  { id: 4, name: 'Недельный герой', icon: 'Award', description: 'Семь дней подряд без превышения лимита', unlocked: false },
  { id: 5, name: 'Мастер времени', icon: 'Crown', description: 'Месяц контроля', unlocked: false },
];

const weeklyData = [
  { day: 'ПН', minutes: 45, goal: 60 },
  { day: 'ВТ', minutes: 30, goal: 60 },
  { day: 'СР', minutes: 75, goal: 60 },
  { day: 'ЧТ', minutes: 40, goal: 60 },
  { day: 'ПТ', minutes: 35, goal: 60 },
  { day: 'СБ', minutes: 20, goal: 60 },
  { day: 'ВС', minutes: 28, goal: 60 },
];

export default function Index() {
  const [timeSpent, setTimeSpent] = useState(28);
  const [isTracking, setIsTracking] = useState(false);
  const [currentQuote, setCurrentQuote] = useState(motivationalQuotes[0]);
  const [dailyGoal] = useState(60);
  const [weeklyTotal] = useState(273);
  const [weeklyGoal] = useState(420);

  useEffect(() => {
    const quoteInterval = setInterval(() => {
      const randomQuote = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];
      setCurrentQuote(randomQuote);
    }, 8000);

    return () => clearInterval(quoteInterval);
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTracking) {
      interval = setInterval(() => {
        setTimeSpent(prev => prev + 1);
      }, 60000);
    }
    return () => clearInterval(interval);
  }, [isTracking]);

  const toggleTracking = () => {
    setIsTracking(!isTracking);
    toast.success(isTracking ? 'Отслеживание остановлено' : 'Отслеживание запущено!');
  };

  const progressPercentage = (timeSpent / dailyGoal) * 100;
  const weeklyProgress = (weeklyTotal / weeklyGoal) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 pb-20">
      <div className="container max-w-md mx-auto px-4 py-6">
        
        <header className="text-center mb-6 animate-fade-in">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent mb-2">
            Свободное время
          </h1>
          <p className="text-muted-foreground text-sm">Контролируй время в соцсетях</p>
        </header>

        <Card className="mb-6 overflow-hidden shadow-lg border-2 animate-scale-in">
          <div className={`h-2 bg-gradient-to-r from-primary via-secondary to-accent ${isTracking ? 'animate-pulse' : ''}`} />
          <CardContent className="pt-6">
            <div className="text-center mb-4">
              <div className={`inline-flex items-center justify-center w-32 h-32 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 mb-4 ${isTracking ? 'animate-pulse' : ''}`}>
                <span className="text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  {timeSpent}
                </span>
              </div>
              <p className="text-sm text-muted-foreground mb-1">минут сегодня</p>
              <p className={`text-xs font-medium ${timeSpent > dailyGoal ? 'text-destructive' : 'text-green-600'}`}>
                {timeSpent > dailyGoal ? `Превышение: +${timeSpent - dailyGoal} мин` : `Осталось: ${dailyGoal - timeSpent} мин`}
              </p>
            </div>

            <Progress value={Math.min(progressPercentage, 100)} className="h-3 mb-4" />

            <Button 
              onClick={toggleTracking}
              className={`w-full h-12 text-lg font-semibold ${isTracking ? 'bg-destructive hover:bg-destructive/90' : 'bg-gradient-to-r from-primary to-secondary hover:opacity-90'}`}
            >
              <Icon name={isTracking ? 'Pause' : 'Play'} className="mr-2" size={20} />
              {isTracking ? 'Остановить' : 'Начать отслеживание'}
            </Button>
          </CardContent>
        </Card>

        <Card className="mb-6 bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-orange-200 animate-fade-in">
          <CardContent className="py-6">
            <div className="flex items-start gap-3">
              <div className="text-3xl">💡</div>
              <div>
                <p className="text-lg font-medium text-orange-900 leading-relaxed">
                  {currentQuote}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="stats" className="mb-6">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="stats">Статистика</TabsTrigger>
            <TabsTrigger value="achievements">Достижения</TabsTrigger>
          </TabsList>

          <TabsContent value="stats" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Icon name="BarChart3" size={20} />
                  Неделя
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {weeklyData.map((day, index) => (
                    <div key={index} className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium">{day.day}</span>
                        <span className={day.minutes > day.goal ? 'text-destructive' : 'text-green-600'}>
                          {day.minutes} / {day.goal} мин
                        </span>
                      </div>
                      <Progress 
                        value={(day.minutes / day.goal) * 100} 
                        className="h-2"
                      />
                    </div>
                  ))}
                </div>
                <div className="mt-6 p-4 bg-muted rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold">Итого за неделю</span>
                    <span className="text-lg font-bold">{weeklyTotal} мин</span>
                  </div>
                  <Progress value={weeklyProgress} className="h-2" />
                  <p className="text-xs text-muted-foreground mt-2">
                    Цель: {weeklyGoal} мин
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Icon name="TrendingDown" size={20} />
                  Средние показатели
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <p className="text-2xl font-bold text-primary">39</p>
                    <p className="text-xs text-muted-foreground mt-1">мин/день</p>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <p className="text-2xl font-bold text-green-600">-35%</p>
                    <p className="text-xs text-muted-foreground mt-1">за месяц</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="achievements" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Icon name="Star" size={20} />
                  Твои достижения
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {achievements.map((achievement) => (
                    <div 
                      key={achievement.id}
                      className={`flex items-center gap-4 p-3 rounded-lg transition-all ${
                        achievement.unlocked 
                          ? 'bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-200' 
                          : 'bg-muted opacity-60'
                      }`}
                    >
                      <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${
                        achievement.unlocked 
                          ? 'bg-gradient-to-br from-primary to-secondary' 
                          : 'bg-gray-300'
                      }`}>
                        <Icon 
                          name={achievement.icon as any} 
                          size={24} 
                          className="text-white"
                        />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold">{achievement.name}</p>
                        <p className="text-xs text-muted-foreground">{achievement.description}</p>
                      </div>
                      {achievement.unlocked && (
                        <Badge className="bg-gradient-to-r from-primary to-secondary">
                          <Icon name="Check" size={14} />
                        </Badge>
                      )}
                    </div>
                  ))}
                </div>
                <div className="mt-6 text-center p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg">
                  <p className="text-sm font-medium text-primary">
                    🏆 Открыто: 3 из 5 достижений
                  </p>
                  <Progress value={60} className="h-2 mt-2" />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Icon name="Settings" size={20} />
              Настройки цели
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm">Дневной лимит</span>
              <Badge variant="outline" className="text-base font-semibold">60 мин</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Недельный лимит</span>
              <Badge variant="outline" className="text-base font-semibold">420 мин</Badge>
            </div>
            <Button variant="outline" className="w-full">
              <Icon name="Edit" size={16} className="mr-2" />
              Изменить цели
            </Button>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
