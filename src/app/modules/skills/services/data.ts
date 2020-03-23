export default [
  {
    title: 'Web Technology',
    subCategories: [
      {
        title: 'Architektura',
        levels: {
          junior:
            'Zna podstawowe metody optymalizacji zasobów (np. minifikacja kodu źródłowego, kompresja gzip). Rozumie jak działa "async" i "deffered".\n',
          middle: 'Potrafi wdrożyć optymalizację ładowania strony metodą Critical Rendering Path.\n',
          senior:
            'Zna strategie ściągania dużych plików. Umie wykorzystywać lazy-loading, preload i precache. Rozumie specyfikę optymalizacji zasobów w niestandardowych (monolitycznych) architekturach projektów.\n',
        },
      },
      {
        title: 'Proces renderowania strony',
        levels: {
          junior:
            'Rozumie wpływ operacji wykonywanych na poziomie CSS, JavaScript i DOM na wydajność aplikacji. (np. CSS umieszczamy w' +
            ' znaczniku "head", JavaScript przed </body)).\nRozumie różnice między client-side a server-side rendering.\nRozumie różnice' +
            ' pomiędzy zdarzeniami DOMContentLoaded i Load.\n',
          middle:
            'Zna kolejne etapy procesu renderowania strony przez przeglądarkę. Układa operacje na DOM tak by nie wywoływać zbędnego reflow (np. nie przeplata zapisu z odczytem).\n-\nRozumie Processing Model.\n',
          senior:
            'Dokładnie rozumie proces renderowania. Wie jakie zmiany w CSS i HTML wymuszają jakie operacje na przeglądarce (CSS Triggers) i wybiera operacje tak, by minimalizować obciążenie (np. CSS Transitions zamiast CSS Postition).\n',
        },
      },
      {
        title: 'Grafika',
        levels: {
          junior: 'Zna różnice między poszczególnymi formatami graficznymi i potrafi je wykorzystywać odpowiednio do wymagań.\n',
          middle:
            'Umie tworzyć i wykorzystywać Responsive Images.\nRozumie różnice między ograniczeniami wydajnościowymi SVG (liczba obiektów) a Canvas (rozdzielczość). \n',
          senior: 'Zna strategie optymalizacji Canvas (CanvasContext + WebGL).\n',
        },
      },
      {
        title: 'Animacje',
        levels: {
          junior: 'Rozumie różnice w wydajności pomiędzy animacjami CSS i JavaScript.\n',
          middle: '-',
          senior:
            'Wykorzystuje requestAnimationFrame do tworzenia płynnych animacji (60 FPS).\nTworzy płynne animacje CSS. Potrafi wymusić wsparcie GPU. Zna różnice między transformacjami 2D i 3D.\n',
        },
      },
      {
        title: 'Cache',
        levels: {
          junior:
            'Rozumie jakie typy zasobów należy cachować a jakie nie, i na jak długo.\nUmie posługiwać się nagłówkiem cache-control.\n',
          middle:
            'Rozumie proces cachowania zarówno po stronie przeglądarki jak i serwera.\nZna różne strategie cachowania (np. hash w nazwie pliku, max-age) i jest w stanie zidentyfikować wymagane działania (także w kodzie aplikacji backend lub w konfiguracji serwera).\nWie po co i jak wykorzystywać Content Delivery Network."\n',
          senior:
            'Zna różnicę w sposobie cachowania w protokołach HTTP/1 i HTTP/2.\nJest w stanie skonfigurować cachowanie po stronie UI za pomocą Service Workerów.\n',
        },
      },
      {
        title: 'Badanie wydajności w przeglądarce',
        levels: {
          junior:
            'Ma świadomość istnienia narzędzi do mierzenia wydajności: DevTools Network, Lighthouse, PageSpeed Insights, WebPageTest.\n',
          middle:
            'Optymalizuje wydajność aplikacji na podstawie otrzymanych wyników z narzędzi: DevTools Network, Lighthouse, PageSpeed Insights, WebPageTest.\n',
          senior: 'Optymalizuje wydajność aplikacji na podstawie wyników otrzymanych z Chrome DevTools Performance.\n',
        },
      },
      {
        title: 'Optymalizacja kodu',
        levels: {
          junior:
            'Rozumie pojęcie złożoności obliczeniowej algorytmów i jest w stanie ją oszacować. Unika zbędnych operacji (zwłaszcza zbędnych zapytań API).\n',
          middle:
            'Tworzy wydajny kod (stara się wybierać rozwiązania o niższej złożoności algorytmicznej).\nRozumie różnice w wydajności funkcji natywnych, funkcji bibliotecznych i polyfilli i wie kiedy i jak ich używać w zależności od wymagań projektu."\n',
          senior:
            'Umie delegować złożone zadania do Web Workerów. \nWie czym jest i jak można wykorzystać Web Assembly.\nUmie skonfigurować projekt tak, by unkać zbędnej transpilacji."\n',
        },
      },
      {
        title: 'Pamięć',
        levels: {
          junior: '-',
          middle: 'Rozumie co to są wycieki pamięci i w jakich sytuacjach mogą występować.',
          senior:
            'Umie analizować dane nt. pamięci w przeglądarce (retainers tree) i bazując na nich naprawić niewydajny fragment kodu. \n',
        },
      },
    ],
  },
  {
    title: 'General Programming',
    subCategories: [
      {
        title: 'Modułowość',
        levels: {
          junior: 'Rozumie cel dzielenia kodu na mniejsze części, pogrupowane względem tego co robią\n',
          middle: 'Zna i konsekwentnie stosuje Single Responsibility Principle w odniesieniu do modułów, klas i funkcji\n',
          senior: 'Potrafi zaprojektować architekturę całego programu tak, by podział na moduły był zgodny z SRP\n',
        },
      },
      {
        title: 'Clean code',
        levels: {
          junior: 'Zna podstawowe zasady czystego kodu. Funkcje i zmienne nazywa w sposób opisowy, tworzy kod czytelny\n',
          middle:
            'Bardzo dobrze zna zasady czystego kodu, pisze samodokumentujący się kod o niskiej złożoności cyklomatycznej, używa komentarzy tylko w „szczególnych przypadkach\n',
          senior:
            'Rozumie na czym polega podział kodu na warstwy abstrakcji, nie miesza warstw abstrakcji w ramach jednej klasy/funkcji, pisze kod zgodnie z „regułą gazety” (od wysokich warstw abstrakcji aż do coraz niższych)\n',
        },
      },
      {
        title: 'DI',
        levels: {
          junior: '-',
          middle: 'Wie jak działa Dependency Injection, potrafi je wykorzystać także w testach jednostkowych\n',
          senior: 'Rozumie ideę stojącą za wzorcem Inversion of Control (IoC) i potrafi pisać kod zgodny z tym wzorcem\n',
        },
      },
      {
        title: 'OOP',
        levels: {
          junior: 'Zna podstawy programowania obiektowego. Wie czym są klasy, instancje oraz jak działa dziedziczenie i hermetyzacja\n',
          middle:
            'Zna i w zależności od sytuacji stosuje wzorce projektowe wykorzystujące OOP (takie jak np. Singleton). Rozumie i stosuje paradygmaty programowania obiektowego (abstrakcja, hermetyzacja, polimorfizm, dziedziczenie). Wie jak działa kompozycja klas oraz dlaczego klasy powinny być luźno powiązane. \n',
          senior:
            'Rozumie bardziej zaawansowane wzorce programowania obiektowego, takie jak Zasada Podstawienia Liskov czy Zasada Demeter oraz wszystkie zasady SOLID. Rozumie koncepcje generator functions jako alternatywę dla klas.\n',
        },
      },
      {
        title: 'Struktury danych',
        levels: {
          junior:
            'Jest świadomy istnienia podstawowych struktur danych (np. obiekt i tablica w przypadku JS) oraz różnic między nimi. Rozumie różnice między typami prymitywnymi i złożonymi i między przekazywaniem zmiennej przez wartość i przez referencję\n',
          middle: '-',
          senior:
            'Zna zaawansowane struktury danych wykorzystywane w programowaniu (takie jak stos, listy jedno-/dwukierunkowe/cykliczne, drzewa binarne, drzewa zrównoważone), dobiera je w zależności od potrzeb\n',
        },
      },
      {
        title: 'Algorytmy',
        levels: {
          junior: '-',
          middle:
            'Zna podstawowe algorytmy takie jak różne rodzaje sortowania. Potrafi przerobić znaleziony pseudokod na kod w języku, w którym programuje i odwrotnie\n',
          senior:
            'Zna różne zaawansowane algorytmy. W sytuacji która tego wymaga potrafi wybrać algorytm lepszy (w sensie złożoności czasowej/pamięciowej) dla danej potrzeby i struktury danych, na których operuje\n',
        },
      },
      {
        title: 'Debugging',
        levels: {
          junior: 'Potrafi debuggować na podstawowym poziomie, używając np. standardowego wyjścia do testowania wartości zmiennych\n',
          middle:
            'Debugguje na zaawansowanym poziomie używając narzędzi specyficznych dla swojego języka, które pozwalają np. na inspekcję stosu wywołań lub zmiennych\n',
          senior:
            'Wykorzystuje narzędzia do debuggowania aby zidentyfikować wąskie gardła związane z wydajnością kodu lub zużyciem pamięci\n',
        },
      },
      {
        title: 'Programowanie funkcyjne',
        levels: {
          junior: '-',
          middle:
            'Zna pojęcie programowania funkcyjnego. Wie czym są funkcje czyste w sensie matematycznym oraz niemutowalne struktury danych\n',
          senior: 'Potrafi wyrażać operacje na strukturach danych w postaci złożenia niezależnych funkcji w sposób optymalny\n',
        },
      },
      {
        title: 'Programowanie asynchroniczne',
        levels: {
          junior: 'Zna pojęcie programowania asynchronicznego i wie czym różni się od synchronicznego wykonywania kodu.\n',
          middle:
            'Świadomie stosuje udostępnione mu przez język mechanizmy programowania asynchronicznego, potrafi debuggować kod wykonywany asynchronicznie\n',
          senior: 'Rozumie czym jest reactive programming i jak wykorzystywać ten paradygmat przy tworzeniu aplikacji\n',
        },
      },
      {
        title: 'Code review',
        levels: {
          junior:
            'Potrafi dostrzec w cudzym kodzie proste błędy (niejasne nazewnictwo, literówki, niewykorzystane zmienne, błędy formatowania)',
          middle:
            'Potrafi dostrzegać w kodzie potencjalne problemy, np. wydajnościowe, naruszenie SOLID. Widzi nieczytelność kodu i potrafi zaproponować przepisanie go na bardziej czytelną formę. Potrafi zidentyfikować potencjalne konflikty w działaniu nowego kodu ze starym kodem\n',
          senior: 'Jest w stanie przewidzieć potencjalne problemy architektoniczne i zaproponować ogólniejsze rozwiązania\n',
        },
      },
      {
        title: 'Regexp',
        levels: {
          junior: 'Zna podstawowe założenia wyrażeń regularnych, potrafi pisać proste wyrażenia regularne\n',
          middle:
            'Potrafi pisać bardziej złożone wyrażenia regularne, bardzo dobrze zna składnię wyrażeń regularnych, zna takie konstrukcje jak negative lookahead czy non-capturing group\n',
          senior:
            'Jest świadomy zagrożeń płynących z pisania nieefektywnych wyrażeń regularnych (catastrophic backtracking), potrafi ropoznawać nieoptymalne wyrażenia regularne i wie jak je naprawić\n',
        },
      },
      {
        title: 'IDE',
        levels: {
          junior:
            'Sprawnie wykorzystuje wybrane IDE w zastosowaniach związanych z pisaniem kodu. Może wymagć pomocy przy konfiguracji projektu.\n',
          middle:
            'Jest w stanie skonfigurować IDE do automatyzacji wszystkich aspektów procesu budowania projektu, uruchamiania testów, formatowania kodu itp.\n',
          senior: '-',
        },
      },
      {
        title: 'GIT',
        levels: {
          junior:
            'Potrafi wykonywać podstawowe zadania z CLI  (commiting, pulling, pushing, stashing, checking out...).\nPotrafi wykonywać wszystkie standardowe zadania (pull requesty, reviews, merges...) przy użyciu narzędzi (BitBucket, SourceTree).\n',
          middle:
            'Potrafi zaprojektować i przygotować strukturę branchy i workflow dla typowego projektu.  \nPotrafi skonfigurować strukturę uprawnień, schemat releasów itp. wspomagając się narzędziami. \n Rozumie zalety podejścia monorepo i multirepo.\n',
          senior:
            'Potrafi rozwiazywać nietrywialne problemy spowodowane błędami użytkowników. \nPotrafi skonfigurować workflow z złożonym, nietypowym projekcie (wiele współżależnych repo itp.).\n Zna zaawansowane funkcje gita (np. bisect, reflog).\n',
        },
      },
      {
        title: 'Narzędzia przeglądarek',
        levels: {
          junior:
            'Potrafi wykorzystywać narzędzia przeglądarki do inspekci HTML, CSS, komunikacji z API, wyjścia konsoli, ustawionych cookies itp.\nWie jak emulować urządzenia mobilne.\n',
          middle:
            'Potrafi debugować za pomocą breakpointów, wykonywać podstawowe testy wydajności (np. zużycie pamięci w czasie, kolejność i czas ładowania zasobów i ich wpływ na ładowanie strony). Wie jak używać narzędzi w kilku przeglądrakach (np. Chrome, Edge, Safari) by móc rozwiazywać problemy specyficzne dla jednej z nich. \nWie jak podłączyć urządzenie z Androidem do Chrome i urządzenie z iOS do Safari. \nPotrafi przeprowadzić podstawowe audyty bezpieczeństwa, wydajności i dostępności.\n',
          senior:
            'Potrafi wykonać zaawansowaną anlizę wydajności (np. badanie wycieków pamięci metodą trzech snapshotów, profilowanie CPU w celu znalezienia problematycznego kodu).\n',
        },
      },
    ],
  },
  {
    title: 'Visual Skills',
    subCategories: [
      {
        title: 'Makiety',
        levels: {
          junior: 'Potrafi zaprojektować statyczną makietę z wykorzystaniem wybranego narzędzia np. Axure, UXPin.\n',
          middle:
            'Potrafi zaprojektować makietę wraz z interakcjami użytkownika wykorzystując animacje/przejścia.\nPotrafi zaprojektować prostą grafikę z wykorzystaniem wybranego narzędzia, np. Photoshop, Sketch. \nPotrafi dostrzec i poprawić podstawowe błędy graficzne (nieostylowane elementy, "gryzące się" kolory) w projekcie lub na stronie.\n',
          senior: 'Potrafi samodzielnie zaprojektować praktycznie każdą funkcjonalność interfejsu użytkownika.\n',
        },
      },
      {
        title: 'Projektowanie graficzne',
        levels: {
          junior: '-',
          middle:
            'Potrafi zaprojektować prostą grafikę z wykorzystaniem wybranego narzędzia, np. Photoshop, Sketch. \nPotrafi dostrzec i poprawić podstawowe błędy graficzne (nieostylowane elementy, "gryzące się" kolory) w projekcie lub na stronie.\n',
          senior:
            'Samodzielnie (bez projektu wizualnego) potrafi tworzyć elementy spójne wizualnie z wcześniej dostarczonymi lub z ogólną koncepcją projektu.\nMoże podjąć dyskusje z klientem na temat stylu graficznego projektu bez udziału grafika.\n',
        },
      },
      {
        title: 'UX',
        levels: {
          junior: '-',
          middle: 'Zna podstawowe wzorce projektowe \n',
          senior:
            'Świadomie wykorzystuje wzorce projektowe, kierując się celami użytkowników, biznesu i ograniczeniami technologicznymi.\n',
        },
      },
      {
        title: 'Design Systems',
        levels: {
          junior: 'Ma świadomość procesów i narzędzi związanych z Design Systems.\n',
          middle: 'Potrafi skonfigurować bibliotekę komponentów w projekcie.\n',
          senior: 'Potrafi zaprojektować Design System z reużywalnymi komponentami oraz wykorzystać je w projekcie.\n',
        },
      },
      {
        title: 'Wizualizacje',
        levels: {
          junior: 'Potrafi przedstawić proste dane za pomocą takich bibliotek jak: Chart.js, C3.js\n',
          middle: 'Zna szeroki wachlarz narzędzi i potrafi dobrać właściwe ze względu na technologie w projekcie i potrzeby.\n',
          senior: 'Umie modyfikować i rozszerzać narzędzia zgodnie z wymogami projektu.\n',
        },
      },
      {
        title: 'Zaawansowane wizualizacje',
        levels: {
          junior: '-',
          middle:
            'Zna nieskopoziomowe narzędzie do wizualizacji danych takie jak D3.js, lub ma doświadczenie w tworzeniu grafiki w natywnym kodzie.\n',
          senior: 'Potrafi od podstaw zbudować nową wizualizację (za pomocą narzędzi takich jak D3.js lub kodu natywnego)\n',
        },
      },
    ],
  },
  {
    title: 'Testing',
    subCategories: [
      {
        title: 'Architektura testów',
        levels: {
          junior:
            'Rozróżnia rodzaje testów. Potrafi opisać: Unit Tests, Regression Tests, Integration Tests, E2E testing. Rozumie czym jest Test Driven Development.\n',
          middle:
            'Rozumie i potrafi wytłumaczyć (klientowi, innym developerom) sens wykonywania różnych rodzajów testów. Jest w stanie uzasadnić wydatek czasowy na pisanie testów.\n',
          senior:
            'Potrafi zaplanować architekturę testów dla całej aplikacji. Jest świadom kosztów i czasu jakie za sobą niosą. Potrafi trafnie uwzględnić je w estymacjach. Pomaga innym deweloperom w testowaniu aplikacji.\n',
        },
      },
      {
        title: 'Testy jednostkowe',
        levels: {
          junior:
            'Zna podstawową składnie wybranego frameworka do testów jednostkowych.\nPotrafi napisać proste dyrektywy sprawdzające wynik wywołanej fukncji. Potrafi przetestować czy funkcja wywołała kolejną funkcję. \nRozumie dlaczego testy jednostkowe ( i nie tylko ) przeprowadzamy na nieprawdziwych danych. Rozumie pojęcie Data Mocking i potrafi dostarczyć zestaw danych testowych do testowania napisanej funkcjonalności.\n Wie czym jest Test Driven Development\n',
          middle:
            'Potrafi testować jednostkowo projekt z zaimplementowanym, frameworkiem JavaScript (Angular, React, Vue).  \nPotrafi przeprowadzić Component Testing, Shallow Rendering, Snapshot tests.\nRozumie testowanie w izolacji. Potrafi podzielić swój kod JavaScript i kod testów tak, by móc osobno testować wybrane części aplikacji.\nRozumie pojęcie Test Coverage. Potrafi określić poziom pokrycia kodu testami.\n Potrafi pisać kod w oparciu o Test Driven Development.\n',
          senior:
            'Bardzo dobrze zna co najmniej jeden framework do testów jednostkowych JavaScript.\nPotrafi pisać zaawansowane testy i na ich podstawie refaktorować testowany kod. Zaawansowane testy: testowanie asynchroniczności, testowanie wywołań funkcji z argumentami wewnątrz funkcji, mockowanie odpowiedzi z serwisu, zapewnienie optymalnej ilości danych wejściowych dla testów. \n',
        },
      },
      {
        title: 'Środowisko',
        levels: {
          junior: 'Potrafi zainstalować framework do testowania, np. Jasmine, Jest, Cypress.\n',
          middle: 'Potrafi przygotować skrypty do odpalenia testów w środowisku CI (np. Jenkins)\n',
          senior: 'Wie jak przygotować środowisko deweloperskie uwzględniające narzędzia do testów jednostkowych, automatycznych.\n',
        },
      },
      {
        title: 'Testy wizualne (manualne i E2E)',
        levels: {
          junior:
            'Zawsze sprawdza swój kod w przeglądarce. Potrafi inspektorem (DevTools, Firebug) sprawdzić poprawność nadanych styli, klas.\n',
          middle:
            'Przeprowadzając code review, w miarę możliwości sprawdza również działanie kodu w przeglądarce.\nPotrafi ocenić przydatność biznesową testów E2E względem projektu. Rozumie cel stosowania Page Objects.\nRozumie koncepcję Snapthot Testingu i uzasadnienie stosowania tej metody.\n',
          senior:
            'Testuje nie tylko samo działanie funkcjonalności ale też jej wydajność. Próbuje udoskonalać lub zmieniać swoje rozwiązania, na podstawie wyników testów.\n',
        },
      },
    ],
  },
  {
    title: 'Build System',
    subCategories: [
      {
        title: 'Webpack lub Gulp',
        levels: {
          junior:
            'Wiem czym są i do czego służą bundlery i task runnery. Potrafi napisać prosty task oraz stworzyć podstawową konfigurację webpacka z pomocą CLI lub dokumentacji.\n',
          middle: 'Potrafi stworzyć bardziej złożoną konfigurację webpacka dla danego projektu oraz pisać bardziej złożone taski.\n',
          senior: 'Potrafi przeprowadzić migrację złożonego projektu ze starszego build systemu. \n',
        },
      },
      {
        title: 'NPM Scripts',
        levels: {
          junior: 'Wie do czego służą NPM Scripts.\nWie gdzie skrypty się znajdują i jak je uruchomić.\n',
          middle:
            'Wie jak przekazywać argumenty bądż zmienne do skryptu.\nPotrafi napisać skrypt, który wykorzystuje zmienne środowiskowe i warunki logiczne.\n',
          senior: 'Zna ograniczenia skryptów związane ze środowiskami uruchomieniowymi (Windows / Unix / CI).\n',
        },
      },
      {
        title: 'Standardy kodowania i linting',
        levels: {
          junior:
            'Rozumie znaczenie trzymania się w projekcie określonego standardu kodu. Zna podstawowe narzędzia do lintowania i umie ich używać jeżeli są już skonfigurowane w projekcie.\n',
          middle: 'Potrafi skonfigurować linter w projekcie oraz uzasadnić zespołowi/ klientowi potrzebę jego używania.\n',
          senior: '-',
        },
      },
    ],
  },
  {
    title: 'HTML',
    subCategories: [
      {
        title: 'Struktura',
        levels: {
          junior:
            'Tworzy dokumenty HTML poprawne semantycznie, zgodnie ze standardem W3C. Zna dostępne znaczniki HTML (np. html, head, body, article, section), ich atrybuty oraz stosuje je zgodnie z przeznaczeniem.\nRozdziela strukturę dokumentu HTML od stylów CSS. Unika stylów inline oraz minimalizuje dodawanie pustych elementów HTML, będących jedynie elementami dekoracyjnymi.\n',
          middle:
            'Tworzy dokument HTML mając na uwadze wydajność (unika zbędnych zagnieżdżeń, pustych tagów), wytyczne SEO, oraz Responsive Web Design (kod HTML jest możliwie spójny na różnych urządzeniach).\nTworzy dokument HTML zgodnie z Document Outline.\n',
          senior: '-',
        },
      },
      {
        title: 'Komponenty',
        levels: {
          junior: '-',
          middle: 'Jest świadomy istnienia Web Components i technologii z nimi związanych, ale nie implementował ich w projekcie.\n',
          senior:
            'Rozumie znaczenie używania WebComponents, ShadowDOM, Scoped CSS oraz potrafi je wykorzystać w projekcie w zależności od wymagań.\n',
        },
      },
      {
        title: 'Formularze',
        levels: {
          junior: 'Zna różne typy elementu <input> i stosuje je zgodnie z wymaganiami projektu.\n',
          middle:
            'Rozumie jak różne typy elementu <input> są przedstawianie na różnych urządzeniach i różnym użytkownikom.\nPotrafi korzystać z wbudowanych mechanizmów HTML5 Form Validation.\n',
          senior:
            'Rozumie dlaczego nie należy stosować zbyt ścisłej walidacji danych i czym to grozi (https://github.com/kdeldycke/awesome-falsehood)\n',
        },
      },
      {
        title: 'HTML5 API',
        levels: {
          junior:
            'Ma świadomość istnienia Audio API.\nMa świadomość istnienia Video API.\nMa świadomość istnienia History API.\nMa świadomość istnienia Geolocation API.\nMa świadomość istnienia Web Messaging API.\nMa świadomość istnienia File API.\nMa świadomość istnienia Fetch API.\nMa świadomość istnienia Canvas API.\n',
          middle:
            'Ma doświadczenie w wykorzystywaniu Audio API.\nMa doświadczenie w wykorzystywaniu Video API.\nMa doświadczenie w wykorzystywaniu History API.\nMa doświadczenie w wykorzystywaniu Geolocation API.\nMa doświadczenie w wykorzystywaniu Web Messaging API.\nMa doświadczenie w wykorzystywaniu File API.\nMa doświadczenie w wykorzystywaniu Fetch API.\nMa doświadczenie w wykorzystywaniu Canvas API oraz bibliotek wspomagających pracę.\n',
          senior: 'Bardzo dobrze zna Canvas API, potrafi rozwiązywać problemy wydajnościowe, pracował w WebGL.\n',
        },
      },
    ],
  },
  {
    title: 'CSS',
    subCategories: [
      {
        title: 'Selektory',
        levels: {
          junior: 'Zna podstawowe selektory i pseudoselektory CSS\n',
          middle:
            'Zna wszystkie selektory, pseudoselektory i kombinatory selektorów. Rozumie algorytm określający specyficzność selektorów i unika wydłużania selektorów (dla uzyskania specyficzności), stara się upraszczać raczej niż komplikować zastany kod CSS. \n',
          senior: 'Zna CSS Next\n',
        },
      },
      {
        title: 'Jednostki miary',
        levels: {
          junior: 'Zna popularne jednostki miary i potrafi powiedzieć czym sie od siebie różnią\n',
          middle: 'Potrafi wybrać odpowiednie jednostki miary w zależności od sytuacji\n',
          senior:
            'Posiada doświadczenie w stylowaniu nietypowych formatów jak maile, stron do druku i umiejętność stosowania przeznaczonych jednostek dla tych zastosowań.\n',
        },
      },
      {
        title: 'Grafika vs CSS',
        levels: {
          junior: 'Wie jak i w jakim celu osadza się obrazki w CSS (background)\n',
          middle:
            'Wie w jakim zakresie można stylować SVG. Umie tworzyć i wykorzystywać sprites. Zna style CSS przydatne w manipulacji grafiką (np. filters)\n',
          senior: '-',
        },
      },
      {
        title: 'Fonts',
        levels: {
          junior: 'Umie osadzić font i wykorzystać go na stronie\n',
          middle:
            'Potrafi przygotować własny font na bazie ikon dostarczonych przez grafika oraz wykorzystać go w postaci ikon na stronie\n',
          senior: '-',
        },
      },
      {
        title: 'Jakość CSS',
        levels: {
          junior:
            'Potrafi stworzyć styl elementów HTML według dostarczonego projektu graficznego, by był on zgodny z dostarczonymi designami\n',
          middle:
            'Dba o wytwarzanie optymalnego kodu wielokrotnego użytku. Dba o skalowalność rozwiązań również od strony stylowania. \n Potrafi pracować na poziomie "pixel-perfect".\n',
          senior:
            'Ma szeroką wiedzę nt. problemów z architekturą CSS w aplikacji i ich rozwiązywania przy zapewnianiu wsparcia dla nietypowych lub starszych przeglądarek. Zna CSS Modules lub podobne narzędzia wspomagające modułowość CSS.\n',
        },
      },
      {
        title: 'Frameworki CSS',
        levels: {
          junior: 'Podstawowa znajomość wybranego frameworka CSS\n',
          middle:
            'Doświadczenie w pracy z wybranym frameworkiem CSS oraz umiejętność dostosowywania do projektu graficznego (Bootstrap, Foundation)\n',
          senior:
            'Doswiadczenie w pracy z różnymi frameworkami CSS, znajomość różnic w ich funkcjonalnościach oraz umiejętność wyboru odpowiedniego na potrzeby projektu\n',
        },
      },
      {
        title: 'Wyświetlanie, pozycjonowanie i floating',
        levels: {
          junior: 'Zna box model. Zna podstawowe wartości atrybutów display oraz position i ich działanie. Rozumie działanie floatingu.\n',
          middle:
            'Umie zarządzać z-index. Zna grid i flex layout. Umiejętność pozycjonowania (np. wyśrodkowywania) elementów w nowych i w starych przeglądarkach.\n',
          senior:
            'Potrafi przygotować i wdrożyć w wieloosobowym projekcie konsekwnetny, skalowalny  i zgodny z RWD system/konwencję pozycjonowania elementów (jako alternatywa dla frameworka CSS).\n',
        },
      },
      {
        title: 'Preprocessors',
        levels: {
          junior: 'Podstawowa znajomość wybranego preprocesora styli (LESS, SASS)\n',
          middle:
            'Umie skonfigurować preprocessor w projekcie (także nietypowym). Praktyczna znajomość bardziej zaawansowanych funkcji (np. Mixiny)\n',
          senior: '-',
        },
      },
      {
        title: 'Transformacje',
        levels: {
          junior: 'Zna pojęcie transformacji i potrafi je zastosować w prostych przykładach\n',
          middle: 'Zdaje sobie sprawę z zalet transformacji (performance) i rozumie w jaki sposób różni się od position.\n',
          senior:
            'Potrafi tworzyć skomplikowane transformacje za pomocą CSS. Zna szeroki wachlarz funkcji odpowiadających za transformacje\n',
        },
      },
      {
        title: 'Animacje',
        levels: {
          junior: 'Zna pojęcie przejścia (transition), potrafi je zastosować w prostych przykładach\n',
          middle: 'Zna pojęcie animacji, potrafi wskazać różnice pomiędzy nią, a przejściem i wykorzystać ją w praktyce\n',
          senior: 'Potrafi tworzyć skomplikowane ale i zoptymalizowane animacje za pomocą CSS\n',
        },
      },
      {
        title: 'Responsive Web Design',
        levels: {
          junior:
            'Potrafi zakodować responsywny layout dla urządzeń mobilnych i desktop (wykorzystując CSS Flexbox, CSS Grid lub gotowy Framework Grid)\n',
          middle: 'Stosuje podejście mobile first. Stara się ograniczać ilość używanych elementów i nie powtarzać się.\n',
          senior: '-',
        },
      },
    ],
  },
  {
    title: 'Javascript',
    subCategories: [
      {
        title: 'Składnia',
        levels: {
          junior: 'Zna podstawową składnię języka (pętle, operatory, funkcje itp.).\n',
          middle:
            'Zna i wykorzystuje bardziej zaawansowane/nowsze elementy składni (np. rest/spread operators, string interpolation...). Zna znaczenie słowa kluczowego this jako kontekstu wykonywania funkcji oraz zastosowania IIFE.\n',
          senior: '-',
        },
      },
      {
        title: 'Wersje języka',
        levels: {
          junior:
            'Jest świadomy ewolucji Javascriptu i wie że nie każdy kod uruchomi się w każdej przeglądarce. Potrafi korzystać z caniuse oraz gotowych narzędzi do transpilacji.\n',
          middle:
            'Samodzielnie rozróżnia (pamięta) jakie konstrukcje pochodzą z której wersji języka i umie zapewnić kompatybilność (polyfile, transpilacja).\n',
          senior:
            'Na bieżąco śledzi rozwój języka. Trafnie podejmuje decyzje (na poziomie projektu) czy i kiedy zacząć wykorzystywać nowe możliwości.\n',
        },
      },
      {
        title: 'Typy danych',
        levels: {
          junior:
            'Zna podstawowe typy danych w javascript (prymitywne + object).  Zna zasięg widoczności zmiennych w javascript i deklarcje var/ let/ const.\n',
          middle:
            'Zna właściwości i metody wbudowane typów string, object i obiektu array. Zna nowe typy danych (Set, Map). Rozumie różnicę i sposób wykorzystania null vs undefined. Umie posługiwać się datami.\n',
          senior:
            'Zna i rozumie używanie mniej oczywistych typów danych wprowadzonych w ES, takich jak symbole, Proxy, Iteratory, WeakSet/WeakMap\n',
        },
      },
      {
        title: 'Typowanie',
        levels: {
          junior: 'Rozumie specyfikę typowania w JS (słabe i dynamiczne).\n',
          middle:
            'Dokładnie rozumie w jaki sposób i kiedy javascript konwertuje typ danych i umie rozpoznawać i unikać błędów z tym związanych. Zna konsekwencje (potencjalne problemy) wiążące się ze słabym dynamicznym typowaniem. Zna narzędzia pozwalające je ominąć (Typescript, Flow). \n',
          senior:
            'Dokładnie wie kiedy korzyści wynikające z zastosowania statycznego typowania przewyższają koszt (overhead) projektowy.\n',
        },
      },
      {
        title: 'Asynchroniczność',
        levels: {
          junior: 'Rozumie jak działają callbacks i promises. Umie śledzić przebieg wykonania asynchronicznego kodu.\n',
          middle:
            'Zna alternatywne metody obsługi asynchroniczności: async/await, generators, observables, wie kiedy jakiej użyć. Umie testować asynchroniczny kod.\n',
          senior:
            'Dba o odpowiednią architekturę i narzędzia, by przepływ kontroli w aplikacji był jasny, także w przypadku części asynchronicznych. \n',
        },
      },
      {
        title: 'Wzorce projektowe w JS',
        levels: {
          junior: '-',
          middle: 'Zna podstawowe/ najprostsze wzorce (Singleton, Module)\n',
          senior:
            'Zna wzorce specyficzne dla JS oraz te spośród "ogólnie znanych", które często wykorzystuje się w JS (Factory, Facade, Decorator, Store, Observer...)\n',
        },
      },
      {
        title: 'Operacje na DOM',
        levels: {
          junior: 'Potrafi wykonywać proste operacje na DOM przy pomocy natywnego kodu. Rozumie ich odpowiedniki w jQuery.\n',
          middle:
            'Zna zastosowanie DocumentFragment.  Zna DOM API (np. umie tworzyć i klonować węzły, odczytywać efektywny css, sprawdzać położenie węzła itp)\n',
          senior: '-',
        },
      },
      {
        title: 'Events',
        levels: {
          junior: 'Potrafi natywnie przechwytywać i wysyłać eventy.\n',
          middle:
            'Wie czym jest event cancelling. Rozumie jak działa proces bąbelkowania, zna różnice między przeglądarkami (np. przechywtywanie myszy, eventy touch), znajomość techniki delegacji eventów.\n',
          senior: '-',
        },
      },
      {
        title: 'Przechowywanie danych',
        levels: {
          junior:
            'Zna podstawowe sposoby przechowywania danych po stronie przeglądarki, rozumie różnice między nimi, potrafi używać API i/lub bibliotek do operowania przechowywanymi danymi\n',
          middle:
            'Wie jakie typy informacji mogą, a jakie nie powinny być przechowywane po stronie przeglądarki oraz w którym miejscu je przechowywać(np. różnica między storage i cookies)\n',
          senior:
            'Zna zaawansowane sposoby na przechowywanie danych (WebSQL, IndexedDB, Filesystem API) oraz limity jakie narzucają przeglądarki na przechowywane dane i dostęp do nich\n',
        },
      },
      {
        title: 'Wątki',
        levels: {
          junior: '-',
          middle:
            'Wie do czego służą Web Workers a do czego Service Workers. Rozumie jak działają wątki w przeglądarce i dlaczego nie należy blokować głównego wątku.\n',
          senior:
            'Ma praktyczne doświadczenie w wykorzystywaniu mechanizmów wątkowych. W przypadku braku dostępu do wątków potrafi pisać kod w sposób nieblokujący głównego wątku\n',
        },
      },
      {
        title: 'Frameworki',
        levels: {
          junior: 'Zna jeden framework JS w stopniu umożliwiającym samodzielną pracę.\n',
          middle:
            'Zna co najmniej dwa frameworki JS w stopniu umożliwiającym samodzielną realizację zadań i co najmniej jeden w stopniu umożliwiającym poprowadzenie projektu, z udokumentowanym doświadczeniem komercyjnym. \n',
          senior:
            'Zna przynajmniej pobieżnie wszystkie aktualnie popularne frameworki. Rozumie ich architekturę, jakiego rodzaju problemy rozwiązują i w jaki sposób, i w związku z tym jest w stanie opanować szybko nowy framework.\n',
        },
      },
    ],
  },
  {
    title: 'Angular',
    subCategories: [
      {
        title: 'Project setup & configuration',
        levels: {
          junior:
            'Umie stworzyć nowy projekt przy użyciu Angular CLI oraz używać ng generate/ng serve/ng lint (--fix)/ng test . Rozumię strukturę folderów/plików w nowoutworzonym projekcie (assets/environments ect). Potrafi odnaleźć się w pliku angular.json (dodawanie scripts/styles). Umie np. dodać polyfills do projektu.\n',
          middle:
            'Zna wszystkie możliwości narzędzia angular CLI. Umiejętność konfiguracji tsconfig.  Pełna umiejętność konfiguracji angular.json. Potrafi skonfigurować projekt angularowy także bez CLI.\n',
          senior:
            'Umiejętność tworzenia własnych bibliotek  (add library, build, cfg angular.json). Znajomość Angular Schematics. Umiejętność bezpiecznego podnoszenia wersji frameworka (ng update). Umiejętność skonfigurowania aplikacji hybrydowej w projekcie z AngularJS.\n',
        },
      },
      {
        title: 'Forms',
        levels: {
          junior: 'Umiejętność budowania formularzy (reactive forms lub template driven forms)\n',
          middle:
            'Zna różnice pomiędzy template driven forms oraz reactive forms. Umie napisać customowy element, który można wykorzystać w formularzu. Umie tworzyć customowe walidatory do formularzy.\n',
          senior: '-',
        },
      },
      {
        title: 'RxJS',
        levels: {
          junior: 'Znajomość podstaw rxjs (rodzaje obiektu observable, subscribe, map, tap, filter, takeUntil).\n',
          middle:
            'Dokładna znajomość (dodatkowe operatory np. merge, combineLatest itp.) i konsekwentne stosowanie RxJS i programowania reaktywno-funkcyjnego. Używanie streamów tak szeroko jak to praktyczne (brak zbędnych subscribe i zrzucania do promises). Umiejętność wykorzystywania róznych rodzajów subjectów (Subject, BehaviorSubject, AsyncSubject, ReplaySubject itp.). Wie co to hot i cold observable.\n',
          senior: 'Praktyczna znajomość schedulerów (np. Asap, Async, Animation Frame)\n',
        },
      },
      {
        title: 'Components, lifecycle & behavior',
        levels: {
          junior:
            'Rozumie czym są komponenty (wie, że to klasa z odpowiednimi metadanymi, zna relację miedzy .html, .ts i .scss). Zna podstawowe lifecycle hooks (przynajmniej: ngOnInit, ngOnDestroy)\n',
          middle:
            'Zna pozostałe lifecycle hooks, ich zastosowanie, oraz kolejność ich wykonywania (cykl życia komponentu). Umie animować komponenty. Zna sposoby stylowania komponentów ( :host, :host-context)\n',
          senior: 'Potrafi manipulować procesem renderowania za pomocą Renderer2\n',
        },
      },
      {
        title: 'Component types & communication',
        levels: {
          junior: ' Zna podstawowe metody komunikacji między komponentami (serwisy, inputs & outputs). \n',
          middle: 'Inne metody interakcji (local variables, view child). Umie wykorzystywać dynamic components. \n',
          senior: '-',
        },
      },
      {
        title: 'Templates',
        levels: {
          junior: 'Wie jak działa interpolacja. Rozumie składnie bindingów (inputy/outputy, dyrektywy, pipes itd).\n',
          middle:
            'Umie posługiwać się template references (ng-template, context binding, użycie ze strukturalnymi dyrektywami, templateoutlet, templateref)\n',
          senior: '-',
        },
      },
      {
        title: 'SSR',
        levels: {
          junior: '-',
          middle: 'Potrafi zaprojektować aplikacje używając lazyloading/prerendering\n',
          senior: 'Angular universal (SSR/prerendering)\n',
        },
      },
      {
        title: 'Routing & BE communication',
        levels: {
          junior: 'Umiejętność konfiguracji podstawowego routingu/router-outlet.  Znajomość httpClient\n',
          middle: 'Znajomość guardów / resolverów. Umiejętność tworzenia Interceptors\n',
          senior: '-',
        },
      },
      {
        title: 'Modules & Injectables',
        levels: {
          junior:
            'Znajomość mechaniki dependency injection i konfiguracji modułów. Znajomość podstawowych wbudowanych serwisów i jak je wpinać w modułach (forRoot/forChild etc). Umiejętność tworzenia własnych Injectables.\n',
          middle:
            'Rozumienie zagadnień związanych z lazy loadingiem modułów i różnic jakie to powoduje. Konsekwentne stosowanie Injectables jako kontenerów logiki. \n',
          senior: '-',
        },
      },
      {
        title: 'Decorators, pipes, directives',
        levels: {
          junior: "Znajomość wbudowanych dekoratorów, pipe'ów i dyrektyw (Struktural/Attribute)\n",
          middle: "Umiejętność pisania własnych pipe'ów i dyrektyw.\n",
          senior: 'Umiejętność pisania własnych dekoratorów\n',
        },
      },
      {
        title: 'NgRx',
        levels: {
          junior: 'Umiejętność wykorzystywania skonfigurowanego store (dopisywanie akcji, efektów, reducerów, dopinanie komponentów)\n',
          middle: 'Umiejętność skonfigurowania store w projekcie\n',
          senior: '-',
        },
      },
      {
        title: 'Test & tools',
        levels: {
          junior: 'Unit testy (przygotowywanie modułów testowych, mockowanie klas). \n',
          middle: 'Debuggowanie (devtools, Augury, ng.probe).  Linty (implementacja wg. standardów PGS, znajomość reguł)\n',
          senior: '-',
        },
      },
      {
        title: 'Other Libraries',
        levels: {
          junior: 'Translacje (korzystanie z gotowych serwisów).\n',
          middle: 'Translacje (i18n, ngx-translate, konfiguracja)\n',
          senior:
            'Service workers (PWA). Znajomość szerokiego wachlarza bibliotek pomocniczych, umiejętność doboru bibliotek i rozwiązań do potrzeb projektu\n',
        },
      },
      {
        title: 'Performance & quality',
        levels: {
          junior: '-',
          middle:
            'Optymalizacja aplikacji (on push strategy, memoize, trackBy w ngFor, ngZone itp.). Bardzo dobra znajomość style guide.\n',
          senior: '-',
        },
      },
    ],
  },
  {
    title: 'React',
    subCategories: [
      {
        title: 'Tworzenie projektu',
        levels: {
          junior: 'Potrafi stworzyć projekt przy pomocy create-react-app.\n',
          middle:
            '"Potrafi modyfikować projekt utworzony za pomocą create-react-app (np. zmienić konfigurację ESlint, dodać CSS Modules).\nPotrafi ręcznie skonfigurować aplikację React dla niestandardowych zastosowań (np. aplikacja typu monolit)."\n',
          senior: '-',
        },
      },
      {
        title: 'Internals',
        levels: {
          junior: '',
          middle:
            'Potrafi stworzyć komponent bez wykorzystania JSX.\nPotrafi wykorzystać "refy", np. w celu obsługi focusa, pobrania elementu DOM, pobrania pozycji scrollbara, itp.\n',
          senior: '-',
        },
      },
      {
        title: 'Component lifecycle & behavior',
        levels: {
          junior:
            'Zna cykl życia komponentu. Korzysta z metod componentDidMount, componentDidUpdate, componentWillUnmount.\nZna zastosowanie props i state. Wie, że setState jest asynchroniczny.\n',
          middle:
            'Korzysta z pozostałych Lifecycle Hooks: getDerivedStateFromProps, getSnapshotBeforeUpdate, shouldComponentUpdate.\nNie korzysta z metod ze statusem Deprecated.\n',
          senior: '-',
        },
      },
      {
        title: 'Component types & communication',
        levels: {
          junior:
            'Stosuje Stateless Function i Class Components w zależności od wymagań. Zna sposoby komunikacji między komponentami (bez wykorzystania Reduxa).\n',
          middle: 'Korzysta z kontenerów i komponentów prezentacyjnych. Zna zastosowanie HOC, Pure Components i render props.\n',
          senior: 'Potrafi korzystać z Context API.\n',
        },
      },
      {
        title: 'Stylowanie',
        levels: {
          junior: 'Przygotowuje style komponentu z wykorzystaniem className (zamiast class).\n',
          middle:
            'Przygotowuje style komponentu z wykorzystaniem CSS Modules lub Styled Components.\nImplementuje animacje komponetów (np. z wykorzystaniem react-transition-group)\n',
          senior: '-',
        },
      },
      {
        title: 'Routing',
        levels: {
          junior: 'Potrafi połączyć aplikację z react-router.\n',
          middle: '-',
          senior: 'Potrawi zaimplementować zaawansowany routing, np. sub-routes, połączenie z animacjami.\n',
        },
      },
      {
        title: 'Server-side Rendering (SSR)',
        levels: {
          junior: '-',
          middle: 'Zna zalety/wady oraz wymagania przygotowania SSR (wymagania odnośnie kodu server-side i client-side).\n',
          senior: '"Potrafi zaimplementować SSR.\nPotrafi zaproponować alternatywne rozwiązanie, np. prerender.io."\n',
        },
      },
      {
        title: 'JSX',
        levels: {
          junior:
            'Zna składnię JSX.\nPotrafi wyświetlić listę komponentów. Korzysta z confitional (ternary) operator w celu warunkowego wyświetlania komponentów.\n',
          middle: 'Dogłębna znajomość JSX poprzez wykorzystywanie props.children, używanie Fragment.\n',
          senior: '-',
        },
      },
      {
        title: 'Forms',
        levels: {
          junior: 'Tworzy formularze wykorzystując Controlled Components. Zna różnice miedzy Controlled a Uncontrolled Component.\n',
          middle:
            '"Tworzy zaawansowane wieloetapowe formularze z własną, niestandardową walidacją.\nKorzysta z bibliotek: formik, redux-forms, react-select."\n',
          senior: '-',
        },
      },
      {
        title: 'Tests & Tools',
        levels: {
          junior: '-',
          middle:
            'Pisze testy komponentów z wykorzystaniem dostępnych narzędzi, np. Jest, Enzyme, react-testing-library.\nPotrafi debugować i diagnozować wydajność aplikacji za pomocą React Profiler.\n',
          senior: '-',
        },
      },
      {
        title: 'Redux',
        levels: {
          junior:
            'Wie czym jest Redux. Jest w stanie dodawać nowe akcje, reducery etc. w istniejącej aplikacji. Jest w stanie przekazać do nowego komponentu dane ze store i dispatchować z niego akcje (znajomość react-redux).\n',
          middle:
            'Potrafi wdrożyć Reduxa w aplikacji i przygotować wzorcowe akcje, reducery, sposób łączenia store z komponentami itd., wybierając odpowiednie narzędzia pomocnicze, np. do asynchronicznych akcji: redux-thunk lub redux-saga.\nPotrafi zintegrować Reduxa z routingiem. \n',
          senior: 'Potrafi pisać swoje middlewary i zna dobrze ekosystem Reduxa.\n',
        },
      },
      {
        title: 'Error handling',
        levels: {
          junior: '-',
          middle: '-',
          senior: 'Wykorzystuje Error Boundaries. Potrafi korzystać ze Strict Mode.\n',
        },
      },
    ],
  },
  {
    title: 'Vue',
    subCategories: [
      {
        title: 'Project setup & configuration',
        levels: {
          junior: 'Potrafi stworzyć projekt przy pomocy Vue CLI 3.\n',
          middle:
            'Potrafi instalować dodatkowe pluginy do projektu, poprzez terminal lub interfejs graficzny.  \nUmiejętność rozszerzania konfiguracji Webpacka.\nPotrafi dodać własny Service Worker i zmienić sposób działania domyślnego SW w aplikacjach PWA.\n',
          senior:
            "Umiejętność konfigurowania projektu bez użycia Vue CLI 3.  \nUmiejętność zmiany konfiguracji Webpacka, dodawania nowych loaderów czy zmiany zasad już istnięjących. Potrafi zmieniać konfigurację pre-procesorów CSS. Umiejętność zarządzania  HTML i Static Assets.\n-\nUmiejętność tworzenia własnych bibliotek, pluginów i web komponentów (target builds).\n Potrafi dodawać i zarządzać zmiennymi środowiskowymi oraz tworzyć nowe 'mody' na potrzeby innych środowisk np. stagging czy test.\n",
        },
      },
      {
        title: 'Internals',
        levels: {
          junior:
            "Umiejętnośc korzystania z computed properties.\nPotrafi użyć atrybutu 'ref' na elemencie html aby zarejestrować referencję do niego.  \n",
          middle:
            "Zna różnice pomiędzy computed properties a watchers i wie kiedy zastosować odpowiednie rozwiązanie.\nUmiejętność wykorzystania atrybutu 'ref' aby dostać się bezpośrednio do komponentu dziecka.\n",
          senior:
            "Zna proces asynchronicznego aktualizowania DOM'u. Wie jak działa reaktywy system danych. Potrafi skorzystać z odpowiednich metod API aby rozwiązać problem reaktywności dynamicznie dodanych właściwości.\n",
        },
      },
      {
        title: 'Component lifecycle & behavior',
        levels: {
          junior:
            'Zna cykl życia instancji Vue. Korzysta z metod created i mounted.\nUmiejętność korzystania z propsów aby przekazać dane do komponentu dziecka.\n',
          middle:
            'Korzysta z pozostałych Lifecycle Hooks: beforeCreate, beforeMount, beforeUpdate, updated, beforeDestroy, destroyed. Zna kolejność wykonywania lifecycle hooków i wie kiedy ma dostęp do odpowiednich opcji komponentu.\nUmiejętność zdefiniowania typu propsa i jego walidacji (prop types, prop validation).\n',
          senior:
            'Umiejętność wykorzystywania niestandardowych eventów emitowanych z lifefycle hooks.\nUmiejętność zdefiniowania niestandardowej walidacji propsów.\n',
        },
      },
      {
        title: 'Built-in Directives',
        levels: {
          junior: 'Zna wbudowane dyrektywy i potrafi je wykorzystywać (v-if, v-else, v-else-if, v-show, v-for, v-html, v-bind, v-on).\n',
          middle: 'Potrafi użyć dyrektywę v-model na komponentach i zna jej modyfikatory.\n',
          senior: '-',
        },
      },
      {
        title: 'Component types & communication',
        levels: {
          junior:
            'Potrafi tworzyć komponenty w podejściu SFC. Ma wiedze na temat podstawowych opcji komponentu.\nZna sposób komunikacji pomiędzy komponentem rodzica i dziecka (props & events).\nUmiejętność korzystania z domyślnych slotów (slot API).\n',
          middle:
            'Umiejętność pracy z dynamicznym komponentami (elementy: component i keep-alive). Wie jak rejestrować komponenty globalnie i lokalnie. \nPotrafi umiejętnie korzystać z dostępu do instancji: $root, $parent i $child.\nUmiejętność korzystania z named slots i scoped slots (slot API).\n',
          senior:
            "Potrafi tworzyć Functional Components za pomoca metody 'render'. Potrafi zaimplementować automatyczne rejestrowanie globalnych komponentów. Umiejętność wyłączania dziedziczenia atrybutów i eventów oraz zmiany strategii mergowania przy pomocy właściwości '$attrs' i '$listeners'. Umiejętność rejestrowania asynchronicznych komponentów za pomocą factory function.\nUmiejętność zaimplementowania komunikacji pomiędzy komponentami z wykorzystaniem osobnej instancji Vue (EventBus). Umiejętność wykorzystania Dependency Injection aby przekazać dane lub metody w dół drzewa hierarchi komponentów.\n-\n",
        },
      },
      {
        title: 'Stylowanie',
        levels: {
          junior: 'Wie co to jest scoped css i potrafi umiejętnie z tego korzystać\n',
          middle: '-',
          senior: '-',
        },
      },
      {
        title: 'Routing',
        levels: {
          junior: 'Potrafi zainstalować plugin Vue Router i zdefiniować podstawowy routing\n',
          middle:
            "Umiejętność tworzenia: dynamicznych tras (routes), zagniedżonych tras ( nested routes), nawigacji z poziomu komponentów za pomocą instancji routera '$router'. Potrafi przekazywać propsy do komponentów. Wie jak sterować nawigacją z poziomu konfiguracji routera.\nUmiejętność implementacji lazy loading na poziomie routingu.\n",
          senior:
            'Umiejętność implementowania autoryzacji użytkownika z wykorzystaniem Navigation Guards i Named Views. Potrafi dodać dynamiczne transition bazując na relacji pomiędzy trasami.\nWie jak zaimplementować fetchowanie danych przed lub po nawigacji.\nPotrafi zarządzać zachowaniem scrolla podczas nawigacji.\n',
        },
      },
      {
        title: 'Server-side Rendering (SSR)',
        levels: {
          junior: '-',
          middle: '-',
          senior: 'Potrafi zaimplementować SSR.\n',
        },
      },
      {
        title: 'Forms',
        levels: {
          junior: 'Umiejętność korzystania z dyrektywy v-model.\n',
          middle:
            'Umiejętność wykorzystywania modyfikatorów dyrektywy v-model (lazy, trim, number).\nPotrafi zaimplementować niestanardową walidację formularza.\nPotrafi korzystać z bibliotek np. Vuelidate lub VeeValidate.\n',
          senior: '-',
        },
      },
      {
        title: 'Tests & Tools',
        levels: {
          junior: 'Potrafi pisać proste asercje w SFC komponentach w Jest/Mocha\n',
          middle: 'Umiejętność wykorzystania biblioteki Vue Test Utils do testowania jednostkowego komponentów.\n',
          senior: '-',
        },
      },
      {
        title: 'Vuex',
        levels: {
          junior: 'Wie co to jest Vuex.\nUmiejętność korzystania ze skonfigurowanego store (Dopisywanie akcji, mutacji i getterów).\n',
          middle:
            'Potrafi skonfigurować store w projekcie. \nUmiejętność dzielenia store na moduły. Wie jak pisać testy jednostkowe do akcji, mutacji czy getterów.\n',
          senior:
            'Potrafi zaimplementować prosty manager stanu bez Vuex. \n-\nUmiejętność pisania pluginów do Vuexa.\nJeśli zajdzie taka potrzeba to potrafi wykorzystać inne implementacje store np. Vuex-ORB czy  Apollo Client + GraphQL.\n',
        },
      },
      {
        title: 'Error handling',
        levels: {
          junior: '-',
          middle: 'Wykorzystuje errorHandler do globalnego przechwytywania błędów podczas renderowania komponentów.\n',
          senior: 'Znajomość wbudowanych handlerów błędów i ostrzeżeń.\n',
        },
      },
      {
        title: 'Reusability & Composition',
        levels: {
          junior: '-',
          middle: 'Umiejętność tworzenia Mixinów, niestandardowych dyrektyw i filtrów.\n',
          senior:
            "Umiejętność dodania funkcjonalności na poziomie globalnym poprzez tworzenie własnych pluginów. Potrafi skonfigurować możliwość używania JSX w funkcjach 'render'.\n",
        },
      },
      {
        title: 'Transitions & Animation',
        levels: {
          junior: '-',
          middle:
            'Potrafi wykorzystać transitions do animacji ładowania elementów czy komponentów. Wie co to są transition classes i potrafi się nimi posługiwać do implementacji animacji.\n',
          senior:
            "Potrafi zaimplementować zaawansowane animacje na liscie elementów oraz tworzyć reużywalne wrappery do animacji.\nWie jak użyć javascript hooks zamiast transition class. Umiejętnie korzysta z atrybutów 'appear' czy 'mode'. \nPotrafi zaimplementować dynamic transitions.\n",
        },
      },
      {
        title: 'Performance & quality',
        levels: {
          junior: '-',
          middle: '-',
          senior:
            'Posiada wiedze na temat potencjalnych problemów z performancem i potrafi je rozwiązać (functional component, child component splitting, v-show, keep-alive).\n',
        },
      },
    ],
  },
  {
    title: 'Performance',
    subCategories: [
      {
        title: 'Ładowanie zasobów',
        levels: {
          junior:
            'Zna podstawowe metody optymalizacji zasobów (np. minifikacja kodu źródłowego, kompresja gzip). Rozumie jak działa "async" i "deffered".\n',
          middle: 'Potrafi wdrożyć optymalizację ładowania strony metodą Critical Rendering Path.\n',
          senior:
            'Zna strategie ściągania dużych plików. Umie wykorzystywać lazy-loading, preload i precache. Rozumie specyfikę optymalizacji zasobów w niestandardowych (monolitycznych) architekturach projektów.\n',
        },
      },
      {
        title: 'Proces renderowania strony',
        levels: {
          junior:
            'Rozumie wpływ operacji wykonywanych na poziomie CSS, JavaScript i DOM na wydajność aplikacji. (np. CSS umieszczamy w' +
            ' znacznyku "head", JavaScript przed znacznikiem "body")).\nRozumie różnice między client-side a server-side' +
            ' rendering.\nRozumie' +
            ' różnice pomiędzy zdarzeniami DOMContentLoaded i Load.\n',
          middle:
            'Zna kolejne etapy procesu renderowania strony przez przeglądarkę. Układa operacje na DOM tak by nie wywoływać zbędnego reflow (np. nie przeplata zapisu z odczytem).\n-\nRozumie Processing Model.\n',
          senior:
            'Dokładnie rozumie proces renderowania. Wie jakie zmiany w CSS i HTML wymuszają jakie operacje na przeglądarce (CSS Triggers) i wybiera operacje tak, by minimalizować obciążenie (np. CSS Transitions zamiast CSS Postition).\n-\nWie czym jest i jak zastosować Shell Pattern.\n',
        },
      },
      {
        title: 'Grafika',
        levels: {
          junior: 'Zna różnice między poszczególnymi formatami graficznymi i potrafi je wykorzystywać odpowiednio do wymagań.\n',
          middle:
            'Umie tworzyć i wykorzystywać Responsive Images.\nRozumie różnice między ograniczeniami wydajnościowymi SVG (liczba obiektów) a Canvas (rozdzielczość). \n',
          senior: 'Zna strategie optymalizacji Canvas (CanvasContext + WebGL).\n',
        },
      },
      {
        title: 'Animacje',
        levels: {
          junior: 'Rozumie różnice w wydajności pomiędzy animacjami CSS i JavaScript.\n',
          middle: '-',
          senior:
            'Wykorzystuje requestAnimationFrame do tworzenia płynnych animacji (60 FPS).\nTworzy płynne animacje CSS. Potrafi wymusić wsparcie GPU. Zna różnice między transformacjami 2D i 3D.\n',
        },
      },
      {
        title: 'Cache',
        levels: {
          junior:
            'Rozumie jakie typy zasobów należy cachować a jakie nie, i na jak długo.\nUmie posługiwać się nagłówkiem cache-control.\n',
          middle:
            'Rozumie proces cachowania zarówno po stronie przeglądarki jak i serwera.\nZna różne strategie cachowania (np. hash w nazwie pliku, max-age) i jest w stanie zidentyfikować wymagane działania (także w kodzie aplikacji backend lub w konfiguracji serwera).\nWie po co i jak wykorzystywać Content Delivery Network.\n',
          senior:
            'Zna różnicę w sposobie cachowania w protokołach HTTP/1 i HTTP/2.\nJest w stanie skonfigurować cachowanie po stronie UI za pomocą Service Workerów.\n',
        },
      },
      {
        title: 'Badanie wydajności w przeglądarce',
        levels: {
          junior:
            'Ma świadomość istnienia narzędzi do mierzenia wydajności: DevTools Network, Lighthouse, PageSpeed Insights, WebPageTest.\n',
          middle:
            'Optymalizuje wydajność aplikacji na podstawie otrzymanych wyników z narzędzi: DevTools Network, Lighthouse, PageSpeed Insights, WebPageTest.\n',
          senior: 'Optymalizuje wydajność aplikacji na podstawie wyników otrzymanych z Chrome DevTools Performance.\n',
        },
      },
      {
        title: 'Optymalizacja kodu',
        levels: {
          junior:
            'Rozumie pojęcie złożoności obliczeniowej algorytmów i jest w stanie ją oszacować. Unika zbędnych operacji (zwłaszcza zbędnych zapytań API).\n',
          middle:
            '"Tworzy wydajny kod (stara się wybierać rozwiązania o niższej złożoności algorytmicznej).\nRozumie różnice w wydajności funkcji natywnych, funkcji bibliotecznych i polyfilli i wie kiedy i jak ich używać w zależności od wymagań projektu."\nRozumie wpływ dodawania polyfills i bibliotek na wydajność i rozmiar kodu.\nPotrafi zaimplementować Dynamic Imports przy użyciu Webpack.\n',
          senior:
            '"Umie delegować złożone zadania do Web Workerów. \nWie czym jest i jak można wykorzystać Web Assembly.\nUmie skonfigurować projekt tak, by unkać zbędnej transpilacji."\nJest świadom różnych poziomów wsparcia języka JavaScript przez przeglądarki i świadomie decyduje o włączeniu/wyłączeniu transpilacji z ES6 do ES5.\n',
        },
      },
      {
        title: 'Pamięć',
        levels: {
          junior: '-',
          middle: 'Rozumie co to są wycieki pamięci i w jakich sytuacjach mogą występować.\n',
          senior:
            'Umie analizować dane nt. pamięci w przeglądarce (retainers tree) i bazując na nich naprawić niewydajny fragment kodu. \n',
        },
      },
    ],
  },
];
