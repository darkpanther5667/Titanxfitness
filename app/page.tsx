import Link from "next/link";
import styles from "./page.module.css";
import { Activity, Zap, Users, ArrowRight, BarChart3, Trophy, Flame } from "lucide-react";
import MobileNav from "./components/MobileNav";

export default function Home() {
  return (
    <div className={styles.container}>
      {/* Navigation */}
      <nav className={`${styles.nav}`}>
        <div className={styles.logo}>TITAN<span className="text-gradient">X</span></div>
        <div className={styles.navLinks}>
          <Link href="/features" className={styles.navLink}>Features</Link>
          <Link href="#" className={styles.navLink}>Community</Link>
          <Link href="#pricing" className={styles.navLink}>Pricing</Link>
          <Link href="/login" className={styles.loginButton}>Login</Link>
        </div>
        <MobileNav />
      </nav>

      {/* Hero Section */}
      <main className={styles.hero}>
        <div className={`${styles.badge} ${styles.animateFadeIn}`}>
          <Zap size={14} style={{ marginRight: '8px', display: 'inline' }} />
          SYSTEM ONLINE: TITAN PROTOCOL ENGAGED
        </div>

        <h1 className={`${styles.title} ${styles.animateFadeIn} ${styles.delay1}`}>
          Awaken Your <br />
          <span className="text-gradient">Godlike Potential</span>
        </h1>

        <p className={`${styles.subtitle} ${styles.animateFadeIn} ${styles.delay2}`}>
          The world's first anime-inspired adaptive fitness system. Level up your physique,
          track your stats like an RPG, and ascend to Titan status.
        </p>

        <div className={`${styles.ctaGroup} ${styles.animateFadeIn} ${styles.delay3}`}>
          <Link href="/signup">
            <button className={styles.buttonPrimary}>
              Start Your Arc
            </button>
          </Link>
          <Link href="/login">
            <button className={styles.buttonSecondary}>
              Member Login <ArrowRight size={16} style={{ marginLeft: '8px', display: 'inline' }} />
            </button>
          </Link>
        </div>
      </main>

      {/* Feature Grid */}
      <section className={styles.features}>
        <div className={`${styles.featureCard} glass ${styles.animateFadeIn} ${styles.delay1}`}>
          <div className={styles.iconBox}>
            <Activity size={24} />
          </div>
          <h3 className={styles.featureTitle}>Stat Tracking</h3>
          <p className={styles.featureDesc}>
            Monitor your Strength, Agility, and Endurance stats. Watch them level up as you crush your workouts.
          </p>
        </div>

        <div className={`${styles.featureCard} glass ${styles.animateFadeIn} ${styles.delay2}`}>
          <div className={styles.iconBox}>
            <Flame size={24} />
          </div>
          <h3 className={styles.featureTitle}>Power Analytics</h3>
          <p className={styles.featureDesc}>
            Deep dive into your training volume. Our AI analyzes your weak points so you can destroy them.
          </p>
        </div>

        <div className={`${styles.featureCard} glass ${styles.animateFadeIn} ${styles.delay3}`}>
          <div className={styles.iconBox}>
            <Trophy size={24} />
          </div>
          <h3 className={styles.featureTitle}>Ranked Battles</h3>
          <p className={styles.featureDesc}>
            Compete on the global leaderboard. Earn badges, surpass rivals, and claim your title as the #1 Titan.
          </p>
        </div>
      </section>

      {/* Pricing Section */}
      <section className={styles.pricingSection} id="pricing">
        <div className={`${styles.badge} ${styles.animateFadeIn}`} style={{ marginBottom: '1rem', width: 'auto' }}>
          MEMBERSHIP TIERS
        </div>
        <h2 className={styles.title} style={{ fontSize: '3rem' }}>Choose Your Class</h2>

        <div className={styles.pricingGrid}>
          {/* Free Tier */}
          <div className={`${styles.pricingCard} glass`}>
            <div className={styles.iconWrapper}>
              <Zap size={32} />
            </div>
            <h3 className={styles.planName}>Novice</h3>
            <div className={styles.price}>Free</div>
            <ul className={styles.planFeatures}>
              <li className={styles.featureItem}><Zap size={16} className={styles.checkIcon} color="var(--primary)" /> Ad-supported experience</li>
              <li className={styles.featureItem}><Zap size={16} className={styles.checkIcon} color="var(--primary)" /> Basic workout logging</li>
              <li className={styles.featureItem}><Zap size={16} className={styles.checkIcon} color="var(--primary)" /> Community access</li>
            </ul>
            <button className={styles.ctaButton}>Current Plan</button>
          </div>

          {/* Pro Tier */}
          <div className={`${styles.pricingCard} ${styles.pro} glass`}>
            <div className={styles.popularBadge}>Most Popular</div>
            <div className={styles.iconWrapper} style={{ color: 'var(--primary)', background: 'rgba(0, 240, 255, 0.1)' }}>
              <Activity size={32} />
            </div>
            <h3 className={styles.planName} style={{ color: 'var(--primary)' }}>Pro Titan</h3>
            <div className={styles.price}>
              <span className={styles.currency}>₹</span>99<span className={styles.period}>/mo</span>
            </div>
            <ul className={styles.planFeatures}>
              <li className={styles.featureItem}><Zap size={16} className={styles.checkIcon} color="var(--primary)" /> No Ads - Pure Focus</li>
              <li className={styles.featureItem}><Zap size={16} className={styles.checkIcon} color="var(--primary)" /> Advanced Analytics</li>
              <li className={styles.featureItem}><Zap size={16} className={styles.checkIcon} color="var(--primary)" /> AI Coach Insights</li>
              <li className={styles.featureItem}><Zap size={16} className={styles.checkIcon} color="var(--primary)" /> Unlimited Logs</li>
            </ul>
            <button className={styles.ctaButton}>Upgrade to Pro</button>
          </div>

          {/* Premium Tier */}
          <div className={`${styles.pricingCard} ${styles.god} glass`}>
            <div className={styles.iconWrapper} style={{ color: 'var(--secondary)', background: 'rgba(112, 0, 255, 0.1)' }}>
              <Trophy size={32} />
            </div>
            <h3 className={styles.planName} style={{ color: 'var(--secondary)' }}>God Tier</h3>
            <div className={styles.price}>
              <span className={styles.currency}>₹</span>199<span className={styles.period}>/mo</span>
            </div>
            <ul className={styles.planFeatures}>
              <li className={styles.featureItem}><Zap size={16} className={styles.checkIcon} color="var(--secondary)" /> Everything in Pro</li>
              <li className={styles.featureItem}><Zap size={16} className={styles.checkIcon} color="var(--secondary)" /> 1-on-1 Human Coaching</li>
              <li className={styles.featureItem}><Zap size={16} className={styles.checkIcon} color="var(--secondary)" /> Custom Meal Plans</li>
              <li className={styles.featureItem}><Zap size={16} className={styles.checkIcon} color="var(--secondary)" /> Verified Titan Badge</li>
            </ul>
            <button className={styles.ctaButton}>Ascend</button>
          </div>
        </div>
      </section>
      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerGrid}>
          <div className={styles.footerBrand}>
            <div className={styles.logo} style={{ fontSize: '2rem' }}>TITAN<span className="text-gradient">X</span></div>
            <p className={styles.footerDesc}>
              Forging the next generation of elite athletes through data-driven training and gamified fitness evolution.
            </p>
            <div className={styles.socialLinks}>
              <a href="#" className={styles.socialIcon} aria-label="Twitter"><Zap size={20} /></a>
              <a href="#" className={styles.socialIcon} aria-label="Instagram"><Activity size={20} /></a>
              <a href="#" className={styles.socialIcon} aria-label="Discord"><Users size={20} /></a>
            </div>
          </div>

          <div className={styles.footerCol}>
            <h4 className={styles.footerTitle}>Platform</h4>
            <div className={styles.footerLinks}>
              <Link href="/features" className={styles.footerLink}>Features</Link>
              <Link href="#pricing" className={styles.footerLink}>Pricing</Link>
              <Link href="/exercises" className={styles.footerLink}>Workouts</Link>
              <Link href="#" className={styles.footerLink}>Leaderboard</Link>
            </div>
          </div>

          <div className={styles.footerCol}>
            <h4 className={styles.footerTitle}>Company</h4>
            <div className={styles.footerLinks}>
              <Link href="#" className={styles.footerLink}>About Us</Link>
              <Link href="#" className={styles.footerLink}>Careers</Link>
              <Link href="#" className={styles.footerLink}>The Protocol</Link>
              <Link href="#" className={styles.footerLink}>Contact</Link>
            </div>
          </div>

          <div className={styles.footerCol}>
            <h4 className={styles.footerTitle}>Legal</h4>
            <div className={styles.footerLinks}>
              <Link href="#" className={styles.footerLink}>Privacy Policy</Link>
              <Link href="#" className={styles.footerLink}>Terms of Service</Link>
              <Link href="#" className={styles.footerLink}>Cookie Policy</Link>
            </div>
          </div>
        </div>

        <div className={styles.footerBottom}>
          <p>&copy; 2025 TitanX Fitness. All rights reserved.</p>
          <div style={{ display: 'flex', gap: '2rem' }}>
            <span>System Status: <span style={{ color: '#00ff88' }}>Online</span></span>
            <span>Version: Protocol v2.5</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
