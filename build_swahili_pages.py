import re
import os
import shutil
import urllib.parse

def replace_text(content, orig, rep, filepath=""):
    if orig in content:
        return content.replace(orig, rep)
    words = [re.escape(w) for w in orig.split()]
    pattern = r'\s+'.join(words)
    new_content, count = re.subn(pattern, rep, content)
    if count == 0:
        print(f"Warning in {filepath}: pattern not matched: {repr(orig[:60])}...")
    return new_content

def translate_page(filepath, outpath, depth, translations, title_sw):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Update HTML lang attribute
    content = re.sub(r'<html lang="[^"]+"', '<html lang="sw"', content, count=1)

    # 2. Update page title
    content = re.sub(r'<title>.*?</title>', f'<title>{title_sw}</title>', content, count=1)

    # 3. Path adjustments for relative depth
    if depth == 1:
        # sw/index.html (depth 1 from root)
        content = re.sub(r'(?<!\.\./)wp-content/', r'../wp-content/', content)
        content = re.sub(r'(?<!\.\./)wp-includes/', r'../wp-includes/', content)
        content = re.sub(r'(?<!\.\./)brand-design\.css', r'../brand-design.css', content)
        content = re.sub(r'(?<!\.\./)favicon', r'../favicon', content)
        content = re.sub(r'(?<!\.\./)apple-touch-icon', r'../apple-touch-icon', content)
        content = re.sub(r'(?<=["\'])feed/', r'../feed/', content)
        content = re.sub(r'(?<!\.\./)comments/', r'../comments/', content)
        content = re.sub(r'(?<!\.\./)wp-json/', r'../wp-json/', content)
        content = re.sub(r'(?<!\.\./)brand-header\.js', r'../brand-header.js', content)

        # Switcher in sw/index.html: EN points to ../index.html, SW is active
        content = re.sub(
            r'<span class="kr-lang-btn kr-lang-active">EN</span>\s*<span class="kr-lang-divider">\|</span>\s*<a href="sw/index\.html" class="kr-lang-btn kr-lang-inactive">SW</a>',
            r'<a href="../index.html" class="kr-lang-btn kr-lang-inactive">EN</a>\n                  <span class="kr-lang-divider">|</span>\n                  <span class="kr-lang-btn kr-lang-active">SW</span>',
            content
        )

    elif depth == 2:
        # sw/about/index.html, sw/our-heritage/index.html, sw/sample-page/index.html (depth 2 from root)
        content = re.sub(r'(?<!\.\./)\.\./wp-content/', r'../../wp-content/', content)
        content = re.sub(r'(?<!\.\./)\.\./wp-includes/', r'../../wp-includes/', content)
        content = re.sub(r'(?<!\.\./)\.\./brand-design\.css', r'../../brand-design.css', content)
        content = re.sub(r'(?<!\.\./)\.\./favicon', r'../../favicon', content)
        content = re.sub(r'(?<!\.\./)\.\./apple-touch-icon', r'../../apple-touch-icon', content)
        content = re.sub(r'(?<=["\'])\.\./feed/', r'../../feed/', content)
        content = re.sub(r'(?<!\.\./)\.\./comments/', r'../../comments/', content)
        content = re.sub(r'(?<!\.\./)\.\./wp-json/', r'../../wp-json/', content)
        content = re.sub(r'(?<!\.\./)\.\./brand-header\.js', r'../../brand-header.js', content)

        # Language switcher replacement:
        content = re.sub(
            r'<span class="kr-lang-btn kr-lang-active">EN</span>\s*<span class="kr-lang-divider">\|</span>\s*<a href="\.\./sw/([^"]+)" class="kr-lang-btn kr-lang-inactive">SW</a>',
            r'<a href="../../\1" class="kr-lang-btn kr-lang-inactive">EN</a>\n                  <span class="kr-lang-divider">|</span>\n                  <span class="kr-lang-btn kr-lang-active">SW</span>',
            content
        )

    # 4. Common Header & Nav Translations (sorted by length descending)
    common_nav_replacements = [
        # Topbar fraud text
        ('Protect yourself from fraud. The Estate of GK Kirima only accepts payment',
         'Jilinde dhidi ya utapeli. Shirika la Urithi wa GK Kirima linapokea malipo kupitia njia rasmi pekee zilizoorodheshwa kwenye wavuti huu. Ukipokea maagizo ya kulipa nje ya njia hizi, usilipe, na utuarifu mara moja.'),
        
        # Navigation Items
        ('>HOME<', '>NYUMBANI<'),
        ('<span>ABOUT</span>', '<span>KUHUSU SISI</span>'),
        ('>Our Story<', '>Kuhusu Sisi<'),
        ('>Our Heritage<', '>Urithi Wetu<'),
        ('>CONTACT<', '>MAWASILIANO<'),
        ('<span>ENQUIRE</span>', '<span>WASILIANA NASI</span>'),

        # Footer common text
        ('Kirima Rise is an entity of the Estate of G.K. Kirima', 'Kirima Rise ni shirika la Urithi wa G.K. Kirima'),
        ('GET IN TOUCH', 'WASILIANA NASI'),
        ('ABOUT US', 'KUHUSU SISI'),
        ('CONTACT US', 'WASILIANA NASI'),
        ('OUR HERITAGE', 'URITHI WETU'),
        ('&copy; 2026 Kirima Rise &bull; All Rights Reserved', '&copy; 2026 Kirima Rise &bull; Haki Zote Zimehifadhiwa'),
        ('Mokhtar Daddah Street, Nairobi', 'Mtaa wa Mokhtar Daddah, Nairobi'),
        ('P.O. Box 11673, Nairobi, 0020', 'S.L.P. 11673, Nairobi, 00200'),
    ]

    all_translations = sorted(common_nav_replacements + translations, key=lambda pair: len(pair[0]), reverse=True)

    for orig, rep in all_translations:
        content = replace_text(content, orig, rep, filepath)

    os.makedirs(os.path.dirname(outpath), exist_ok=True)
    with open(outpath, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"Generated {outpath} successfully ({len(content)} bytes)")

# --- 1. HOME PAGE TRANSLATIONS (index.html) ---
home_translations = [
    # Notice Banner
    ('Public Notice', 'Taarifa kwa Umma'),
    ('View 201 Plots', 'Tazama Viwanja 201'),
    ('Inquiry Form &rarr;', 'Fomu ya Maulizo &rarr;'),
    ('1st Batch of 201 Verified Plots Released', 'Awamu ya Kwanza ya Viwanja 201 Vilivyothibitishwa Imetolewa'),
    ('Regularisation &amp; inquiry now open for parcels in', 'Uhalalishaji na maulizo sasa yamefunguliwa kwa viwanja katika'),
    ('(113 plots) and', '(viwanja 113) na'),
    ('(88 plots). Verify your parcel on our interactive inquiry directory.', '(viwanja 88). Thibitisha kiwanja chako kwenye orodha yetu maingiliano ya maulizo.'),

    # Hero
    ('Empowering Tomorrow.', 'Kukuza Kesho Njema.'),
    ('From Njiru to Kirima Rise', 'Kutoka Njiru Hadi Kirima Rise'),
    ('For years this place was known simply as Njiru Kirima land. A location on a map. A description of where something is, rather than what it is becoming. When the Estate set out to build a planned, serviced, properly titled community here, it began with the name.',
     'Kwa miaka mingi eneo hili lilifahamika tu kama shamba la Njiru Kirima. Eneo kwenye ramani. Maelezo ya pale kitu kilipo, badala ya kile kinachokuwa. Wakati Shirika la Urithi lilipoanza kujenga jamii iliyopangwa, yenye huduma, na hatimiliki halisi, safari ilianza na jina hili.'),

    # Becoming
    ('What<strong> Kirima Rise </strong> Is\n                  Becoming', 'Kile<strong> Kirima Rise </strong> Kinachokuwa'),
    ('Kirima Rise is a planned community: surveyed, mapped, subdivided into individual plots, approved by county and national government, and moving steadily toward the issuance of individual titles.',
     'Kirima Rise ni jamii iliyopangwa: iliyopimwa, iliyoainishwa kwenye ramani, iliyogawanywa katika viwanja binafsi, iliyoidhinishwa na serikali ya kaunti na ya kitaifa, na inayoelekea kwa uthabiti kuelekea kutoa hatimiliki binafsi.'),
    ('It is roads and boundaries where there was open ground. It is addresses, where there were none. It is named courts and marked plots and most importantly, it is ownership.',
     'Ni barabara na mipaka palipokuwa ardhi wazi. Ni anwani halisi, mahali pasipokuwa na anwani. Ni mitaa yenye majina na viwanja vilivyowekwa alama za mipaka, na la muhimu zaidi, ni umiliki halali.'),
    ('In the founder&#8217;s own spirit, that social and economic prosperity must exist in the same space, the land that once fed Nairobi will now anchor a secure, owned and thriving community.',
     'Katika nia thabiti ya mwanzilishi, kwamba ustawi wa kijamii na kiuchumi lazima viwepo katika nafasi moja, ardhi iliyowahi kulisha Nairobi sasa itakuwa msingi wa jamii salama, inayomilikiwa na yenye ustawi.'),
    ('LEARN MORE', 'FAHAMU ZAIDI'),
    ('Learn More', 'Fahamu Zaidi'),

    # News & Updates
    ('LATEST MILESTONES &amp; ANNOUNCEMENTS', 'HATUA NA MATANGAZO YA HIVI PUNDE'),
    ('News &amp; Updates', 'Habari na Taarifa Mpya'),
    ('Follow our on-the-ground progress, title deed issuances, and community engagements directly from the Estate of GK Kirima on YouTube.',
     'Fuata maendeleo yetu mashinani, utoaji wa hatimiliki, na ushirikishwaji wa jamii moja kwa moja kutoka Shirika la Urithi wa GK Kirima kwenye YouTube.'),
    ('Watch on YouTube', 'Tazama kwenye YouTube'),
    ('First Batch of Title Deeds Issued to Njiru Residents', 'Awamu ya Kwanza ya Hatimiliki Yatolewa kwa Wakazi wa Njiru'),
    ('Title Deeds', 'Hatimiliki'),
    ('Official Release', 'Taarifa Rasmi'),
    ('Kirima Rise has already begun giving out the first batch of title deeds to residents of Njiru who have completed the regularisation process. Learn more by reaching out to us through our official channels.',
     'Kirima Rise tayari imeanza kutoa awamu ya kwanza ya hatimiliki kwa wakazi wa Njiru ambao wamekamilisha mchakato wa uhalalishaji. Pata maelezo zaidi kwa kuwasiliana nasi kupitia njia rasmi.'),
    ('Community Forum', 'Mkutano wa Jamii'),
    ('Stakeholder, Financial & Resident Engagement', 'Ushirikishwaji wa Wadau, Mashirika ya Kifedha na Wakazi'),
    ('We at Kirima Rise have made sure to engage local residents, financial institutions and local government to make the regularization process as smooth and straightforward as possible, ensuring every resident has support.',
     'Sisi katika Kirima Rise tumehakikisha tunashirikisha wakazi wa eneo hilo, taasisi za kifedha na serikali ya mtaa ili kufanya mchakato wa uhalalishaji uwe mwepesi na wazi iwezekanavyo, kuhakikisha kila mkazi anapata usaidizi.'),
]

# --- 2. ABOUT PAGE TRANSLATIONS (about/index.html) ---
about_translations = [
    ('Kirima Rise is not built from nothing. It is built from a name, a legacy, and a promise that the land in Njiru would one day belong, lawfully and permanently, to the people who call it home.',
     'Kirima Rise haijajengwa kutoka pasipo kitu. Imejengwa kutokana na jina, urithi, na ahadi kwamba ardhi ya Njiru siku moja itakuwa mali ya kisheria na ya kudumu ya watu wanaoita hapa nyumbani.'),
    ('Explore', 'Gundua'),
    ('From Njiru', 'Kutoka Njiru'),
    ('to Kirima Rise', 'Hadi Kirima Rise'),
    ('For years this place was known simply as Njiru Kirima land. A location on a map. A description of where something is, rather than what it is becoming. When the Estate set out to build a planned, serviced, properly titled community here, it began with the name.',
     'Kwa miaka mingi eneo hili lilijulikana tu kama ardhi ya Njiru Kirima. Eneo kwenye ramani. Maelezo ya mahali kitu kilipo, badala ya kile kinachokuwa. Wakati Shirika la Urithi lilipoanza kujenga jamii iliyopangwa, yenye huduma na hatimiliki halisi hapa, ilianza na jina.'),
    ('Why the Name Is Kirima Rise', 'Kwa Nini Jina Ni Kirima Rise'),
    ('Rise carries two meanings at the same time. As a noun it is a place: an incline, high ground, a position above the plain. As a verb it is movement: to rise is to become something more than you were. Both meanings are true of this place, and both are true of the man whose name it carries.',
     'Rise (Kuinuka) inabeba maana mbili kwa wakati mmoja. Kama nomino ni mahali: mwinuko, ardhi ya juu, nafasi juu ya tambarare. Kama kitenzi ni harakati: kuinuka ni kuwa kitu kikubwa zaidi kuliko ulivyokuwa awali. Maana zote mbili ni kweli kwa eneo hili, na zote ni kweli kwa mtu ambaye jina lake linabebwa hapa.'),
    ('Gerishon Kirima rose. From a tea-picking childhood in Kangema to a carpenter&#8217;s bench on the Kinangop, from a carpenter&#8217;s bench to a trader&#8217;s counter, from a trader&#8217;s counter to the councils and Parliament of his country. The name is not decoration. It is the description of a life, applied to a place.',
     'Gerishon Kirima aliinuka. Kutoka utotoni akichuma chai kule Kangema hadi kwenye benchi la useremala Kinangop, kutoka benchi la useremala hadi kaunta ya biashara, kutoka kaunta ya biashara hadi mabaraza na Bunge la nchi yake. Jina hili si pambo tu. Ni maelezo ya maisha, yaliyowekwa kwenye eneo hili.'),
    ('And because Rise is a direction rather than a destination, it is a name that cannot be outgrown. There is no point at which a community stops rising.',
     'Na kwa sababu kuinuka ni mwelekeo badala ya kikomo cha safari, ni jina ambalo haliwezi kupitwa na wakati. Hakuna wakati ambapo jamii inakoma kuinuka.'),
    ('The Name Begins with Kirima', 'Jina Linaloanza na Kirima'),
    ('In the name Kirima Rise, Kirima comes first, and that is deliberate. The second word describes what kind of place this is. The first word says who stands behind it.',
     'Katika jina Kirima Rise, Kirima linatangulia kwanza, na hilo lilifanywa kwa makusudi. Neno la pili linaeleza aina ya eneo hili lilivyo. Neno la kwanza linasema ni nani anayesimama nyuma yake.'),
    ('This is the same family, holding to the same belief the founder held: that ownership should be within reach of ordinary people, and that a place is worth building properly.',
     'Hili ni shirika la familia lile lile, likishikilia imani ile ile ambayo mwanzilishi aliishikilia: kwamba umiliki unapaswa kufikiwa na watu wote, na kwamba eneo linafaa kujengwa kwa ustadi na umakini.'),
    ('What Kirima Rise Is Becoming', 'Kile Kirima Rise Kinachokuwa'),
    ('Kirima Rise is a planned community: surveyed, mapped, subdivided into individual plots, approved by county and national government, and moving steadily toward the issuance of individual titles.',
     'Kirima Rise ni jamii iliyopangwa: iliyopimwa, iliyoainishwa kwenye ramani, iliyogawanywa katika viwanja binafsi, iliyoidhinishwa na serikali ya kaunti na ya kitaifa, na inayoelekea kwa uthabiti kuelekea kutoa hatimiliki binafsi.'),
    ('It is roads and boundaries where there was open ground. It is addresses, where there were none. It is named courts and marked plots and most importantly, it is ownership.',
     'Ni barabara na mipaka palipokuwa ardhi wazi. Ni anwani halisi, mahali pasipokuwa na anwani. Ni mitaa yenye majina na viwanja vilivyowekwa alama za mipaka, na la muhimu zaidi, ni umiliki halali.'),
    ('In the founder&#8217;s own spirit, that social and economic prosperity must exist in the same space, the land that once fed Nairobi will now anchor a secure, owned and thriving community.',
     'Katika nia thabiti ya mwanzilishi, kwamba ustawi wa kijamii na kiuchumi lazima viwepo katika nafasi moja, ardhi iliyowahi kulisha Nairobi sasa itakuwa msingi wa jamii salama, inayomilikiwa na yenye ustawi.'),
    ('Empowering Tomorrow.', 'Kukuza Kesho Njema.'),
]

# --- 3. OUR HERITAGE TRANSLATIONS (our-heritage/index.html) ---
heritage_translations = [
    ('The Kirima name carries a legacy of stewardship, vision, and commitment to the communities surrounding its land.',
     'Jina la Kirima linabeba urithi wa uwakili, maono, na kujitolea kwa jamii zinazozunguka ardhi yake.'),
    ('Explore', 'Gundua'),
    ('The Man </strong>Behind the Name', 'Mtu </strong>Aliye Nyuma ya Jina Hili'),
    ('Gerishon Kamau Kirima was born in 1932 in Kiruri village, Kangema, in the tea-growing highlands of Murang&#8217;a County on the slopes of the Aberdare Ranges, one of eleven children. Like many of his generation, he left school early to help his parents pick tea and began his working life with little more than his hands, his discipline, and an unshakeable belief in honest enterprise.',
     'Gerishon Kamau Kirima alizaliwa mnamo 1932 katika kijiji cha Kiruri, Kangema, katika nyanda za juu za kilimo cha chai za Kaunti ya Murang’a kwenye miteremko ya Milima ya Aberdare, akiwa mmoja wa watoto kumi na mmoja. Kama wengi wa kizazi chake, aliondoka shuleni mapema kusaidia wazazi wake kuchuma chai na kuanza maisha yake ya kazi akiwa na mikono yake, nidhamu yake, na imani thabiti katika biashara ya uaminifu.'),
    ('As a young man he moved to the Kinangop plateau, where he taught himself carpentry. At the dawn of Kenya&#8217;s independence, he moved to Nairobi, where he became the pioneer carpenter at the Royal College, today the University of Nairobi, and ran small furniture workshops in Bahati and Kaloleni. His wife, Agnes Waruguru, minded the counter at Kaloleni, selling the furniture he crafted in his spare time. From those workshops he built, plank by plank and shilling by shilling, one of the most remarkable business stories of independent Kenya.',
     'Akiwa kijana alihamia uwanda wa juu wa Kinangop, ambapo alijifunza useremala yeye mwenyewe. Mwanzoni mwa uhuru wa Kenya, alihamia Nairobi, ambapo alikuwa seremala wa kwanza katika Chuo cha Kifalme (Royal College), leo Chuo Kikuu cha Nairobi, na kuendesha karakana ndogo za fanicha huko Bahati na Kaloleni. Mkewe, Agnes Waruguru, alisimamia kaunta huko Kaloleni, akiuza fanicha alizotengeneza wakati wake wa ziada. Kutoka karakana hizo alijenga, ubao kwa ubao na shilingi kwa shilingi, mojawapo ya hadithi za kibiashara za kuvutia zaidi katika Kenya huru.'),
    ('Opening Doors </strong>That Had Been Closed', 'Kufungua Milango </strong>Iliyokuwa Imefungwa'),
    ('Gerishon Kirima belonged to the pioneering generation of African entrepreneurs who opened doors that had been closed to Africans under colonial rule. He established butcheries and bars serving Nairobi&#8217;s new working class, registered his company Kirima &amp; Sons, and is remembered to this day as a father of nyama choma, Kenya&#8217;s beloved delicacy. He also ventured into public transport with the Kirima Bus Service, one of the leading African-owned bus companies of the era, carrying passengers on the central Kenya routes long dominated by colonial-era operators.',
     'Gerishon Kirima alikuwa miongoni mwa kizazi cha waanzilishi wa wafanyabiashara wa Kiafrika waliofungua milango iliyokuwa imefungwa kwa Waafrika chini ya utawala wa kikoloni. Alianzisha mabucha na baa zilizohudumia tabaka jipya la wafanyikazi wa Nairobi, akasajili kampuni yake ya Kirima & Sons, na anakumbukwa hadi leo kama baba wa nyama choma, mlo unaopendwa sana nchini Kenya. Pia alijitosa katika usafiri wa umma na Kirima Bus Service, mojawapo ya kampuni kuu za mabasi zilizomilikiwa na Waafrika za enzi hiyo, zikibeba abiria kwenye njia za katikati ya Kenya zilizotawaliwa kwa muda mrefu na waendeshaji wa kikoloni.'),
    ('He did not stop at his own success. As chairman of the African Butchers Association, later the Kenya National Butchers&#8217; Union, he successfully championed the right of African farmers and butchers to compete in a meat industry that had shut them out. It was not simply a business achievement. It changed who was allowed to take part.',
     'Hakuishia tu kwenye mafanikio yake binafsi. Akiwa mwenyekiti wa Chama cha Wachinjaji wa Kiafrika, baadaye Umoja wa Wachinjaji wa Kitaifa wa Kenya (Kenya National Butchers’ Union), alitetea kwa mafanikio haki ya wakulima na wachinjaji wa Kiafrika kushindana katika tasnia ya nyama iliyokuwa imewatenga. Haikuwa tu mafanikio ya kibiashara. Ilibadilisha nani aliyeruhusiwa kushiriki.'),
    ('The Land That Fed Nairobi', 'Ardhi Iliyolisha Nairobi'),
    ('The land at Njiru was never idle to him. It was here that he established one of the first private abattoirs owned by an African, and for decades this land helped feed the city of Nairobi. Long before it carried a name of its own, this place was already doing serious work.',
     'Ardhi ya Njiru haikuwahi kuwa tupu au kutotumika kwake. Ilikuwa hapa ambapo alianzisha machinjio ya kwanza ya kibinafsi yaliyomilikiwa na Mwafrika, na kwa miongo kadhaa ardhi hii ilisaidia kulisha jiji la Nairobi. Muda mrefu kabla ya kubeba jina lake lenyewe, eneo hili tayari lilikuwa likifanya kazi kubwa na ya maana.'),
    ('A Life of Service', 'Maisha ya Utumishi'),
    ('His success carried him into public service. He was elected a Nairobi city councillor, rose to Deputy Mayor of Nairobi, served as Member of Parliament for Starehe Constituency from 1989, and held office as an Assistant Minister.',
     'Mafanikio yake yalimwingiza katika utumishi wa umma. Alichaguliwa kuwa diwani wa jiji la Nairobi, akapanda cheo kuwa Naibu Meya wa Nairobi, akahudumu kama Mbunge wa Eneo Bunge la Starehe kuanzia 1989, na kushika wadhifa wa Naibu Waziri.'),
    ('A Life of Faith', 'Maisha ya Imani'),
    ('Beneath the businessman and the politician was a man of deep and consistent faith. In 1952, Kirima gave his life to the Lord at Africa Inland Church (AIC), Kijabe, and he remained a devoted believer until his last breath. His home congregation was AIC Ziwani in Nairobi, where he served for years as a permanent member of the church&#8217;s development committee. He was a generous benefactor of the church more widely, donating numerous pieces of land in support of its growth across the city.',
     'Chini ya mfanyabiashara na mwanasiasa kulikuwa na mtu mwenye imani thabiti na ya kina. Mnamo 1952, Kirima alimkabidhi Bwana maisha yake katika kanisa la Africa Inland Church (AIC), Kijabe, na alibaki kuwa muumini mwaminifu hadi pumzi yake ya mwisho. Ushirika wake wa nyumbani ulikuwa AIC Ziwani jijini Nairobi, ambapo alihudumu kwa miaka mingi kama mwanachama wa kudumu wa kamati ya maendeleo ya kanisa hilo. Alikuwa mfadhili mkarimu wa kanisa kwa mapana zaidi, akitoa vipande vingi vya ardhi kusaidia ukuaji wake kote jijini.'),
    ('For a man so widely known for boardrooms and ballot papers, few outside the family saw this side of him. For Kirima, spiritual conviction and material success were never separate pursuits.',
     'Kwa mtu aliyejulikana sana kwa kumbi za mikutano na karatasi za kura, wachache nje ya familia waliona upande huu wake. Kwa Kirima, msimamo wa kiroho na mafanikio ya kimaada hayakuwahi kuwa mambo yaliyotengana.'),
    ('The Measure of the Man', 'Kipimo cha Mtu Huyu'),
    ('For all his wealth and standing, Kirima remained famously humble. He insisted that his own children pick coffee, collect rent, and serve customers, because he believed that prosperity means nothing without discipline and dignity in work. He dealt with people directly and in person, and he worked long after he had any need to.',
     'Pamoja na utajiri na hadhi yake yote, Kirima alibaki mnyenyekevu kwa namna ya kipekee. Alisisitiza kwamba watoto wake wenyewe wachume kahawa, wakusanye kodi ya nyumba, na kuwahudumia wateja, kwa sababu aliamini kuwa ustawi hauna maana yoyote bila nidhamu na heshima katika kazi. Alishughulika na watu ana kwa ana na moja kwa moja, na aliendelea kufanya kazi hata muda mrefu baada ya kuwa hana haja ya kufanya hivyo.'),
    ('What he believed was simple, and he never moved from it: that social and economic prosperity must exist in the same space. Land ownership should not be the privilege of a few, and where a person begins in life should not decide what they are able to build.',
     'Kile alichoamini kilikuwa rahisi, na hakubadilika kamwe kutoka humo: kwamba ustawi wa kijamii na kiuchumi lazima viishi katika nafasi moja. Umiliki wa ardhi haupaswi kuwa fursa ya wachache tu, na pale mtu anapoanzia maishani hapaswi kuamua kile anachoweza kujenga.'),
    ('He rose from modest beginnings, dealt honestly, and believed that land ownership should not be a privilege of the few.',
     'Aliinuka kutoka mwanzo wa unyenyekevu, alitenda kwa uaminifu, na aliamini kuwa umiliki wa ardhi haupaswi kuwa fursa ya wachache tu.'),
    ('Investing in the Next Generation', 'Kuwekeza Katika Kizazi Kijacho'),
    ('Kirima had thirteen children, and his belief in opportunity extended to every one of them. Having left school early himself, he was determined that his own children would not have to. Almost all of them were educated in Kenya and the United Kingdom, sons and daughters alike. Not many men of his generation believed in spending large sums of money to educate a daughter the way they would a son, but Kirima made no such distinction, he believed in all his children equally.',
     'Kirima alikuwa na watoto kumi na watatu, na imani yake katika fursa ilienea kwa kila mmoja wao. Akiwa ameondoka shuleni mapema yeye mwenyewe, aliazimia kwamba watoto wake hawatalazimika kufanya hivyo. Karibu wote walisomeshwa nchini Kenya na Uingereza, wavulana na wasichana kwa pamoja. Si wanaume wengi wa kizazi chake walioamini kutumia kiasi kikubwa cha fedha kumsomesha binti sawa na mvulana, lakini Kirima hakuweka ubaguzi kama huo, aliwaamini watoto wake wote kwa usawa.'),
    ('Gerishon Kamau Kirima passed away in December 2010, aged 88. His funeral was held at AIC Ziwani in Nairobi, before he was laid to rest at his beloved rural home in Kiruri. The Estate of GK Kirima carries his legacy forward, and it remains the owner of the land and the parent body under whose authority Kirima Rise operates.',
     'Gerishon Kamau Kirima alifariki dunia mnamo Desemba 2010, akiwa na umri wa miaka 88. Mazishi yake yalifanyika katika kanisa la AIC Ziwani jijini Nairobi, kabla ya kulazwa kwenye makao yake ya mashambani anayoyapenda huko Kiruri. Shirika la Urithi wa GK Kirima linaendeleza urithi wake, na linabaki kuwa mmiliki wa ardhi na chombo kikuu kinachoongoza Kirima Rise.'),
    ('<strong>A Life</strong> in Brief', '<strong>Muhtasari</strong> wa Maisha'),
    ('Born in the tea-growing highlands of Murang&#8217;a County, on the slopes of the Aberdares.',
     'Alizaliwa katika nyanda za juu za kilimo cha chai za Kaunti ya Murang\'a, kwenye miteremko ya Milima ya Aberdare.'),
    ('Teaches himself carpentry and begins working life with his hands.', 'Alijifunza useremala mwenyewe na kuanza maisha ya kazi kwa mikono yake.'),
    ('Gives his life to the Lord at AIC Kijabe; remains a devoted member of the Africa Inland Church for the rest of his life.',
     'Alimkabidhi Bwana maisha yake katika AIC Kijabe; alibaki muumini mwaminifu wa Africa Inland Church maisha yake yote.'),
    ('Independence era', 'Enzi ya Uhuru'),
    ('Moves to Nairobi; pioneer carpenter at the Royal College, today the University of Nairobi. Runs furniture workshops in Bahati and Kaloleni.',
     'Alihamia Nairobi; seremala wa kwanza katika Chuo cha Kifalme (Royal College), leo Chuo Kikuu cha Nairobi. Aliendesha karakana za samani huko Bahati na Kaloleni.'),
    ("1960's", 'Miaka ya 1960'),
    ('Registers Kirima &amp; Sons Ltd. Establishes butcheries and bars serving Nairobi&#8217;s new working class.',
     'Alisajili kampuni ya Kirima &amp; Sons Ltd. Alianzisha mabucha na baa zilizohudumia tabaka jipya la wafanyikazi wa Nairobi.'),
    ("1970's", 'Miaka ya 1970'),
    ('Njiru becomes a hub of enterprise, home to one of the first private abattoirs owned by an African, supplying meat to Nairobi.',
     'Njiru ikawa kitovu cha biashara, makao ya mojawapo ya machinjio ya kwanza ya kibinafsi yaliyomilikiwa na Mwafrika, yakilisha nyama jiji la Nairobi.'),
    ('Public service', 'Utumishi wa Umma'),
    ('Elected Nairobi city councillor, rises to Deputy Mayor, serves as Member of Parliament for Starehe from 1989, and holds office as Assistant Minister.',
     'Alichaguliwa kuwa diwani wa jiji la Nairobi, akapanda kuwa Naibu Meya, akahudumu kama Mbunge wa Starehe kuanzia 1989, na kushika wadhifa wa Naibu Waziri.'),
    ('December 2010', 'Desemba 2010'),
    ('Passes on. The Estate of GK Kirima assumes stewardship of his legacy.', 'Alifariki dunia. Shirika la Urithi wa GK Kirima lilikabidhiwa usimamizi wa urithi wake.'),
    ('Kirima Rise brand launched; title processing begins.', 'Chapa ya Kirima Rise yazinduliwa; mchakato wa hatimiliki waanza rasmi.')
]

# --- 4. CONTACT & PLOTS TRANSLATIONS (sample-page/index.html) ---
sample_translations = [
    ('Our office team is available to assist. Please use only the verified contact details below.',
     'Timu ya ofisi yetu ipo tayari kusaidia. Tafadhali tumia maelezo ya mawasiliano yaliyothibitishwa hapa chini pekee.'),
    ('Explore', 'Gundua'),
    ('1st Batch Released Plots (201 Plots)', 'Awamu ya Kwanza ya Viwanja Vilivyotolewa (Viwanja 201)'),
    ('Regularisation list for Block 220 & Block 179', 'Orodha ya kurasimisha kwa Block 220 & Block 179'),
    ('Batch 1 Verified', 'Awamu ya 1 Imethibitishwa'),
    ('Search Parcel No. (e.g. 651, 4460) or Block...', 'Tafuta Nambari ya Kiwanja (mfano 651, 4460) au Block...'),
    ('All Plots (201)', 'Viwanja Vyote (201)'),
    ('Plot selected!', 'Kiwanja kimechaguliwa!'),
    ('Auto-fill Enquiry Form &darr;', 'Jaza Fomu ya Maulizo &darr;'),
    ('Showing <span id="krVisibleCount" class="kr-count-badge">201</span> of 201 plots',
     'Inaonyesha <span id="krVisibleCount" class="kr-count-badge">201</span> kati ya viwanja 201'),
    ('Tip: Click any plot to pre-fill your enquiry', 'Kidokezo: Bofya kiwanja chochote kujaza fomu yako'),
    ('No matching plots found in 1st Batch', 'Hakuna viwanja vinavyolingana katika Awamu ya 1'),
    ('Plots are being processed in batches. If your parcel is not listed in this first 200 batch, please send us an enquiry with your parcel number below so our team can verify your status.',
     'Viwanja vinashughulikiwa kwa awamu. Ikiwa kiwanja chako hakijaorodheshwa katika awamu hii ya kwanza ya 200, tafadhali tutumie uchunguzi na nambari yako ya kiwanja hapa chini ili timu yetu iweze kuthibitisha hali yako.'),
    ('Send Enquiry for this Parcel', 'Tuma Uchunguzi kwa Kiwanja Hiki'),
    
    # Script strings
    ('Parcel #${item.parcel}', 'Kiwanja #${item.parcel}'),
    ('Enquire &rarr;', 'Ulizia &rarr;'),
    ('Verified in 1st Batch &bull; Form auto-filled below', 'Imethibitishwa katika Awamu ya 1 &bull; Fomu imejazwa hapa chini'),
    ('Enquiry: Parcel #${parcelNo} (${blockName}) - 1st Batch', 'Maulizo: Kiwanja #${parcelNo} (${blockName}) - Awamu ya 1'),

    # Contact Details
    ('Project Office', 'Ofisi ya Mradi'),
    ('Official Phone Lines', 'Nambari Rasmi za Simu'),
    ('Enquiries &amp; Plot Status:', 'Maswali &amp; Hali ya Viwanja:'),
    ('Official Email', 'Barua Pepe Rasmi'),
    ('Office Hours', 'Masaa ya Ofisi'),
    ('Sunday &#038; Public Holidays: Closed', 'Jumapili &#038; Sikukuu za Kitaifa: Tumefungwa'),
    
    # Form
    ('Send an Enquiry', 'Tuma Uchunguzi / Swali'),
    ('Use this form to send a message to the Kirima Rise team.',
     'Tumia fomu hii kutuma ujumbe kwa timu ya Kirima Rise.'),
    ('Your name', 'Jina lako'),
    ('Your email', 'Barua pepe yako'),
    ('Phone number (Optional &bull; For direct WhatsApp &amp; SMS verification)',
     'Nambari ya simu (Hiari &bull; Kwa uthibitisho wa moja kwa moja wa WhatsApp &amp; SMS)'),
    ('Subject', 'Mada'),
    ('Your message (optional)', 'Ujumbe wako (hiari)'),
    ('Send via Email', 'Tuma kupitia Barua Pepe'),
    ('Enquire via WhatsApp', 'Uliza kupitia WhatsApp'),
    ('placeholder="e.g. 0722 000 000"', 'placeholder="mfano 0722 000 000"'),
]

print("Executing sorted translations...")
translate_page('index.html', 'sw/index.html', 1, home_translations, 'Kirima Rise | Tovuti Rasmi ya Shirika la Urithi wa G.K. Kirima')
translate_page('about/index.html', 'sw/about/index.html', 2, about_translations, 'Kuhusu Sisi | Kirima Rise')
translate_page('our-heritage/index.html', 'sw/our-heritage/index.html', 2, heritage_translations, 'Urithi Wetu | Kirima Rise')
translate_page('sample-page/index.html', 'sw/sample-page/index.html', 2, sample_translations, 'Mawasiliano na Viwanja | Kirima Rise')

# Mirror to public/
for src, dst in [
    ('sw/index.html', 'public/sw/index.html'),
    ('sw/about/index.html', 'public/sw/about/index.html'),
    ('sw/our-heritage/index.html', 'public/sw/our-heritage/index.html'),
    ('sw/sample-page/index.html', 'public/sw/sample-page/index.html'),
]:
    os.makedirs(os.path.dirname(dst), exist_ok=True)
    shutil.copy2(src, dst)
    print(f"Mirrored {src} -> {dst}")

print("All Swahili pages built and mirrored successfully!")
