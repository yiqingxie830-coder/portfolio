import { site } from "./content";
import { SplineScene } from "./SplineScene";

/**
 * 首屏：导航栏下方一整条 3D 场景（桌面 75vh，手机 50vh），名字和一句话介绍叠在场景上方。
 * 文字层设了 pointer-events: none，鼠标点击会直接传给场景。
 */
export function Hero() {
  return (
    <section className="relative min-[1015px]:pb-[80px] min-[1015px]:pt-[63px]">
      <div className="relative h-[50vh] w-full overflow-hidden min-[1015px]:h-[75vh]" style={{ backgroundColor: site.splineBackground }}>
        {site.splineUrl ? (
          <SplineScene url={site.splineUrl} poster={site.splinePoster} background={site.splineBackground} hiddenObjects={site.splineHiddenObjects} title={`${site.name} 3D scene`} />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-center text-[14px] tracking-[1px] text-[#9a9a9a]">
            YOUR 3D SCENE
            <br />
            (paste your Spline link into content.ts → splineUrl)
          </div>
        )}

        <div className="wl-fade-in pointer-events-none absolute inset-x-0 top-[28px] text-center min-[1015px]:top-[44px]">
          <h1 className="whitespace-nowrap text-[35px] font-normal leading-[42px] min-[1015px]:text-[50px] min-[1015px]:leading-[60px]">
            <span className="wl-gradient-text">{site.name}</span>
          </h1>
          <p className="whitespace-nowrap text-[18px] leading-[21.6px] text-[#6b6d73] min-[1015px]:text-[25px] min-[1015px]:leading-[30px]">
            {site.tagline}
          </p>
        </div>
      </div>

      <p className="py-[40px] text-center text-[12px] leading-[14.4px] tracking-[0.96px] text-[#55565a] min-[1015px]:hidden">
        {site.mobileNote}
      </p>
    </section>
  );
}
