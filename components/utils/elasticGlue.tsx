import styles from "./elasticGlue.module.scss";

export default function ElasticGlue(props: any) {
  return <div className={styles.glue} style={{ width: props.width, height: props.height}}></div>;
}
