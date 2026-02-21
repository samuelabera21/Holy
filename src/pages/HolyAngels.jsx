
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import useGlobalReveal from "../hooks/useGlobalReveal";
import "../styles/reveal.css";
import Holy from "../components/holy/Holy";
import holyAngels from "../data/holy/holyAngels";
import "../styles/holy/HolyAngels.css";

function HolyAngels() {
  useGlobalReveal("main");
  const [current, setCurrent] = useState(0);
  const total = holyAngels.length;
  const { t, i18n } = useTranslation();
  const isAm = i18n.language?.startsWith("am");

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % total);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + total) % total);
  };

  useEffect(() => {
    if (total === 0) return undefined;

    const interval = setInterval(() => {
      nextSlide();
    }, 6000);

    return () => clearInterval(interval);
  }, [total]);

  const getAngelLabel = (id) => {
    const amName = t(`holyAngels.items.${id}.amharicName`, {
      defaultValue: ""
    });
    const enName = t(`holyAngels.items.${id}.name`, {
      defaultValue: ""
    });
    const fallbackName = isAm
      ? t(`holyAngels.items.${id}.name`, { lng: "en", defaultValue: "" })
      : t(`holyAngels.items.${id}.amharicName`, { lng: "am", defaultValue: "" });

    return (isAm ? amName : enName) || fallbackName;
  };

  return (
    <main className="holy-angels-page">
      <header className="holy-angels-hero">
        <div className="holy-angels-hero-media" aria-hidden="true">
          <img
            src={holyAngels[current]?.image}
            alt=""
            className="holy-angels-hero-image"
          />
          <div className="holy-angels-hero-overlay" />

          <button
            className="holy-angels-arrow left"
            onClick={prevSlide}
            aria-label={t("holyAngels.slider.prevAria")}
            type="button"
          >
            ❮
          </button>
          <button
            className="holy-angels-arrow right"
            onClick={nextSlide}
            aria-label={t("holyAngels.slider.nextAria")}
            type="button"
          >
            ❯
          </button>
        </div>



        <div className="holy-angels-hero-content">
          <br /><br /><br />
          <h1>{t("holyAngels.hero.title")}</h1>
          <a className="holy-angels-hero-cta" href="#holy-angels-list">
            {t("holyAngels.hero.cta")}
          </a>
        </div>
      </header>

      <section className="holy-angels-intro">
        <div className="holy-angels-intro-card">
          <h2>ቅዱሳን መላእክት መግቢያ</h2>

          <div className="holy-angels-intro-body">
            <div className="holy-angels-intro-item">
              <h3>1. ለምን ቅዱስ ተባሉ</h3>
              <p>
                ቅዱሳ መላእክት ለምን ቅዱስ ተባሉ የሚለውን ጥያቄ
                ከመመለሳችን በፊት ቅዱስ የሚለውን ቃል አስቀድሞ
                መመለስ ግድ ይላል። ቅዱስ የሚለው ቃል ቀደሰ ከሚለው
                የግእዝ ግስ የተገኘ ሲሆን ትርጉሙም ቅዱስ፣ ማለት፣ ክቡር፣
                ምስጉን፣ ልዩ፣ ምርጥ፣ ንጹህ፣ ጽሩይ ማለት ሲሆን ቅዱሳን
                የሚለው ቃል ደግሞ ቅዱስ ለሚለው ቃል የብዙ ቁጥር
                መጠሪያ ነው። ቅዱሳት ስንል ለስም፣ ለሀገር፣ ለመጻህፍት፣
                ለሰዎች፣ ለመላእክት፣ ለንዋየ ቅዱሳት ይቀጸላል እና
                ለሁሉም እንደየአግባቡ ይተረጎማል። ቅዱስ የሚለው ቃል
                የእግዚአብሔር ወዳጆቹ አገልጋዮቹ ለእርሱ የተለዩ የተመረጡ
                የከበሩት በሙሉ ቅዱሳን ይባላሉ። ስለዚህ ለእግዚአብሔር
                ለርስቱ የተለዩ ለክብሩ የተመረጡት ግሩማን ንጹሐን ኃያላን
                ረቂቃን መላእክትን ቅዱሳን እንላቸዋለን። ቅዱሳን መላእክትን
                ቅዱስ ስንል የእግዚአብሔርን ክብር ለፍጡራን መስጠታችን
                አይደለም። እግዚአብሔርን ቅዱስ ስንል ቅድስና የባህሪ ገንዘቡ
                ስለሆነ እርሱን እንደ አምላክነቱ እንደጌተነቱ ለእርሱ
                የሚገባውን ክብር እናቀርባለን (ኢሳ 57፥15)። በዚህ መሰረት
                እግዚአብሔር በባህሪው ንጹሕ ስለሆነ ንጹሐ ባህሪ ይባላል፣
                ክቡር ስለሆነ የክብር አምላክ ይባላል፣ ምስጉን ስለሆነ
                የምስጋና ጌታ ይባላል፣ ጽሩይ ስለሆነ ጹሩየ ባሕሪ ይባላል።
                ስለዚህ የቅድስና መሰረት በባህሪው ቅዱስ የሆነው አምላካችን
                በቅድስናው የጸና በመሆኑ ወዶና ፈቅዶ የቅድስናን ጸጋ
                ለፍጡራን እንዲደርሳቸው አድርጓል፤ ይህም ይታወቅ ዘንድ
                "እኔ ቅዱስ ነኝ እና ቅዱሳን ሁኑ" (ዘሌ19፥2; 1ጴጥ1፥17)
                ሲል ማዘዙ በጸጋ ቅዱሳን እንዲባሉ ወስኗል። ይህንንም ቅዱስ
                ጳውሎስ "ዳሩ ግን፦ እኔ ቅዱስ ነኝና ቅዱሳን ሁኑ ተብሎ
                ስለተጻፈ የጠራቹ ቅዱስ እንደሆነ እናንተም በኑሮአቹሁ ሁሉ
                ቅዱሳን ሁኑ" በማለት ለፍጥረታት የተሰጠውን የጸጋ ቅድስና
                በምግባር በሃይማኖት እንዲጠብቁት አባታዊ ምክሩን
                አስተላልፎአል። ቅዱሳን መላእክት ስንል የተቀደሱ፣ የተመሰገኑ፣
                የተመረጡ፣ ንጹሓን፣ የከበሩ መልክተኞች፣ አገልጋዮች
                ማለታችን ነው። ስለምን ይህ ክብር ተሰጣቸው ብንል በሃይማኖታቸው
                በተፈጥሮአቸው ምክንያት ነው፤ የቅዱሳን ክብር እግዚአብሔር
                አክብሮአቸዋል። በአንጸሩም በጥርጥር ምክንያት ከክብራቸው
                የተዋረዱ፣ ጸጋቸውን የተገፈፉ በሥራቸው ውዱቃን የሆኑ
                ሰራዊተ አጋንንት ደግሞ እርኩሳን መላእክት ይባላሉ።
                (2ጴጥ 2፥4)
              </p>
            </div>

            <div className="holy-angels-intro-item">
              <h3>2. የመላእክት ተፈጥሮ</h3>
              <p>
                መላእክት በቀዳማይ ዕለት ከተፈጠሩት 8 ፍጥረታት መካከል አንዱ
                በመሆናቸው ተፈጥሮአቸው “እምኅበ አልቦ” አካላዊ ብርሃን
                ፈጥሮአቸዋል። ስለዚህ መንፈሳውያን ረቂቃን በመሆናቸው
                ስጋና አጥንት የላቸውም በመጽሐፍ “መላእክቱን መንፈስ
                የሚያደርግ” (ዕብ 1፥6-14) ተብሎ ተጻፎ አለ። ቅዱሳን መላእክት
                ስለተልዕኮአቸውና አግልገሎታቸው ከእሳት እና ከንፋስ
                ተፈጥረዋል የሚሉ ሊቃውንት አሉ (ዕብ 1፥14; መዝ103፥4)።
                እሳት ብሩህ ነው መላእክትም ብሩሃነ አእምሮ ናቸው፤ ነፋስ
                ፈጣን ነው መላእክትም ፈጣኖች ናቸው። ቅዱሳን መላእክት ሲፈጠሩ
                በነገድ መቶ በከተማ አሰር ሆነው ለባውያን፣ ነባቢያን፣ ህያዋን
                ሆነው ተፈጥረዋል።
              </p>
            </div>

            <div className="holy-angels-intro-item">
              <h3>3. ቅዱሳን መላእክት መቼ ተፈጠሩ?</h3>
              <p>
                ቅዱሳን መላእከት በቀዳማይ ዕለት እሑድ ለይኩን ብርሃን ባለ ጊዜ
                ስጋ የሌላቸው ረቂቃን ሆነው ተፈጥረዋል። ክቡር ዳዊትም
                "መላእክት ሁሉ አመስግኑት ፀሐይ ጨረቃ ከዋክብት ብርሃን ሁሉ
                አመስግኑት እርሱ ብሎአልእና ሁሉም እርሱም አዝዞአልእና
                ተፈጠሩም" (መዝ148፥2-5) ሲል ተናግሯል። በመጀመሪያው ቀን
                እሑድ ሰማይን እና መላእክትን ሁሉ ፈጠርኵዋቸው ሲል
                መጽሐፍ ይመሰክራል፤ ለምስጋና እና ለቅዳሴ የተፈጠሩት
                መላእክት በፍጥረት የመጀመሪያ ዕለት በዕለተ እሑድ
                መፈጠራቸውን ልናስተውል ይገባል።
              </p>
            </div>

            <div className="holy-angels-intro-item">
              <h3>4. የቅዱሳን መላእክት ባህርይ</h3>
              <p>
                የክብር ባለቤት ጌታችን ኢየሱስ ክርስቶስ በመዋዕለ ስጋዌ
                ካስተማራቸው ትምህርቶች መካካል አንዱ ስለትንሳኤ ሙታን
                ያስተማረው ትምህርት ነው። ሰዱቃውያን ስለትንሳኤ ሲጠይቁት
                እንዲህ ብሎ መለሰላቸው፦ "በትንሣኤስ እንደ ሰማይ መላእክት
                በሰማይ አያገቡም አይጋቡምም" በማለት መመለሱ የቅዱሳን
                መላእክት ተፈጥሮአቸው ሕያዋን፣ ለባውያን፣ ሰማያውያን፣
                መንፈሳውያን፣ ብርሃናውያን መሆናቸውን ያሳያል (ሉቃ24፥39)።
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="holy-angels-layout">
        <aside
          className="holy-angels-toc"
          aria-label={t("holyAngels.toc.ariaLabel")}
        >
          <h2>{t("holyAngels.toc.title")}</h2>
          <a href="#holy-angels-list">{t("holyAngels.toc.all")}</a>
          {holyAngels.map((angel) => (
            <a key={angel.id} href={`#angel-${angel.id}`}>
              {getAngelLabel(angel.id)}
            </a>
          ))}
        </aside>

        <div className="holy-angels-content" id="holy-angels-list">
          <Holy showSlider={false} />
        </div>
      </div>
    </main>
  );
}

export default HolyAngels;