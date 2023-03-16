import genericStyles from '../index.module.css';
import { Roboto } from 'next/font/google';
import useOnboarding from '@/hooks/onboarding-manager';
import styles from './index.module.css';

const roboto700 = Roboto({ weight: '700', subsets: ['latin'] });

export default function ConsentsStep() {
  const { executeInstance, deleteInstance } = useOnboarding();

  const onSubmit = (e: any) => {
    e.preventDefault();
    executeInstance(new FormData());
  };

  const onReset = (e: any) => {
    e.preventDefault();
    deleteInstance();
  };

  return (
    <section>
      <header>
        <p className={`${genericStyles.title} ${roboto700.className}`}>
          Consents
        </p>
        <p className={genericStyles.subTitle}>
          Read everything before continuing
        </p>
      </header>
      <br />
      <form
        className={genericStyles.form}
        onSubmit={onSubmit}
        onReset={onReset}
      >
        <article className={styles.consentsPortView}>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam
            consectetur nec sapien ultrices pretium. Nunc pulvinar enim a enim
            luctus, nec finibus risus volutpat. Sed sed tortor eget massa
            feugiat luctus ac quis elit. Vestibulum laoreet luctus sodales. Nunc
            at libero eu odio ultrices pharetra a tincidunt neque. Mauris eu
            efficitur tortor. Nullam tempor metus quis diam lobortis egestas.
            Curabitur feugiat sed lorem vel dignissim. Sed eget risus at justo
            euismod varius vel eu eros. Duis ullamcorper orci nec mattis
            ullamcorper. Curabitur sapien nibh, interdum in libero pharetra,
            malesuada porttitor urna. Nulla venenatis risus vel dolor consequat
            condimentum. Duis leo mi, interdum sit amet ex vitae, laoreet
            aliquam nulla. Nunc pretium, neque sit amet vulputate vulputate,
            augue nisl ullamcorper eros, vitae condimentum lorem ligula sed
            nunc. Pellentesque imperdiet justo sit amet nisl dictum, in placerat
            metus accumsan. Fusce pharetra mauris vitae porta consequat.
          </p>
          <p>
            Phasellus sagittis consectetur tempor. Etiam nec lacus nec dui
            imperdiet accumsan quis non felis. Integer lorem diam, lobortis nec
            facilisis sit amet, facilisis ac ipsum. Fusce lorem arcu, euismod
            quis lorem nec, faucibus tincidunt arcu. Vestibulum ante ipsum
            primis in faucibus orci luctus et ultrices posuere cubilia curae;
            Sed porttitor neque ligula, at egestas nunc semper in. Quisque
            faucibus porttitor velit, consectetur dapibus felis suscipit et. Sed
            vel faucibus ligula. Ut varius scelerisque odio, non ultricies
            ligula elementum eu. Duis sollicitudin justo eu tortor condimentum
            egestas. Pellentesque vestibulum lectus nec laoreet tincidunt. Donec
            accumsan arcu id tincidunt volutpat.
          </p>
          <p>
            Suspendisse dictum, velit ut venenatis euismod, diam leo malesuada
            nisi, vitae efficitur eros nisl vitae elit. Nulla leo dolor,
            fermentum eget scelerisque at, consectetur at magna. Nunc facilisis
            tortor sit amet dapibus condimentum. Fusce a pharetra justo. Ut vel
            nulla lobortis, eleifend magna in, congue tortor. In non enim
            tristique, placerat magna ullamcorper, scelerisque est. Integer
            consequat et tortor in ultricies. Morbi lacinia ex vel justo cursus
            vehicula. Praesent volutpat eros in lectus dictum varius. Vestibulum
            facilisis aliquam mollis. Nam bibendum magna sed arcu gravida
            rhoncus. Aliquam massa dolor, porttitor nec dapibus et, eleifend non
            ipsum.
          </p>
          <p>
            Aliquam non tristique ex. Ut auctor dignissim enim eget efficitur.
            Interdum et malesuada fames ac ante ipsum primis in faucibus. In
            lobortis feugiat accumsan. Nam congue elementum efficitur. Vivamus
            convallis tellus vitae diam lacinia tincidunt. Praesent convallis,
            urna sit amet iaculis convallis, metus purus rhoncus massa, ut
            elementum augue sapien nec diam. Donec elementum ipsum justo, in
            semper augue euismod eu. Integer non sem imperdiet, iaculis augue
            nec, interdum eros. Donec accumsan pellentesque tempus. Nam in
            lacinia turpis. Morbi posuere elit ac nunc placerat varius.
          </p>
          <p>
            Suspendisse tempus enim eget mollis suscipit. Nullam ornare feugiat
            dui, tincidunt rutrum urna ultricies eget. Ut felis massa, iaculis
            eu erat vehicula, finibus eleifend justo. Cras risus quam, cursus ut
            dignissim cursus, dapibus non urna. Praesent sed turpis commodo,
            pretium ante ut, vestibulum sapien. Pellentesque habitant morbi
            tristique senectus et netus et malesuada fames ac turpis egestas.
            Vestibulum ligula magna, feugiat rutrum commodo ut, suscipit quis
            felis. Mauris pellentesque leo eget enim iaculis, vitae posuere mi
            dignissim. Aenean leo turpis, dignissim nec neque sed, finibus
            lobortis leo. Suspendisse risus urna, volutpat at posuere vel,
            ultrices tincidunt odio. Nulla sollicitudin tortor sit amet felis
            vulputate, non laoreet tellus vestibulum.{' '}
          </p>
        </article>
        <button className={genericStyles.buttonSecondary} type="reset">
          Reject
        </button>
        <button className={genericStyles.button} type="submit">
          Accept
        </button>
      </form>
    </section>
  );
}
