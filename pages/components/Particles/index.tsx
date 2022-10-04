import {useCallback} from "react";
import type {Container, Engine} from "tsparticles-engine";
import Particles from "react-tsparticles";
import {loadFull} from "tsparticles";
import styles from '../../../styles/Home.module.css';
import CONSTANTS from '../../../utils/constants';

const ParticlesBackground = () => {
    const particlesInit = useCallback(async (engine: Engine) => {
        // console.log(engine);

        // you can initialize the tsParticles instance (engine) here, adding custom shapes or presets
        // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
        // starting from v2 you can add only the features you need reducing the bundle size
        await loadFull(engine);
    }, []);

    const particlesLoaded = useCallback(async (container: Container | undefined) => {
        // await console.log(container);
    }, []);

    return (
        <Particles
            id="tsparticles"
            init={particlesInit}
            loaded={particlesLoaded}
            canvasClassName={styles.particleCanvas}
            // options={CONSTANTS.PARTICLES_ONE}
            params={CONSTANTS.PARTICLES_ONE}
        />
    );
};

export default ParticlesBackground;
