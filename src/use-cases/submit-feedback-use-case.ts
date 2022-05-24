import { MailAdapter } from '../adapters/mail-adapter';
import { FeedbacksRepository } from '../repositories/feedbacks-repositories';

interface SubmiteFeedbackUseCaserequest {
    type: string
    comment: string
    screenshot?: string
}

export class SubmiteFeedbackUseCase {

    constructor(
        private feedbacksRepository: FeedbacksRepository,
        private mailAdapter: MailAdapter,
    ) { }


    async execute(request: SubmiteFeedbackUseCaserequest) {
        const { type, comment, screenshot } = request

        if (!type) {
            throw new Error('Type is required!')
        }
        if (!comment) {
            throw new Error('Comment is required!')
        }
        if (screenshot && !screenshot.startsWith('data:image/png;base64')) {
            throw new Error('Invalid screenshot format.')
        }

        await this.feedbacksRepository.create({
            type,
            comment,
            screenshot
        })

        await this.mailAdapter.sendMail({
            subject: "Novo feedback",
            body: [
                `<div 
                style="
                width: 100vw;
                height: 100vh;
                overflow: hidden;
                display: flex;
                justify-content: space-between;
                flex-direction: column;">`,

                `<header style="display: flex; justify-content: flex-start; background-color: #8257E5; color: #fff;  align-items: center;">`,
                    `<a href="#">`,

                        `<svg width="180" height="80" viewBox="0 0 1024 468" fill="none" xmlns="http://www.w3.org/2000/svg">`,
                            `<rect width="1024" height="468" rx="234" fill="#8257E5"/>`,
                            `<rect width="306" height="306" transform="translate(71 81)" fill="#8257E5"/>`,
                            `<path d="M125.267 292.57C111.03 268.549 106.05 240.158 111.262 212.725C116.474 185.293 131.52 160.706 153.576 143.581C175.631 126.456 203.179 117.97 231.047 119.716C258.916 121.463 285.189 133.322 304.934 153.067C324.678 172.811 336.537 199.084 338.284 226.953C340.03 254.821 331.544 282.369 314.419 304.424C297.294 326.48 272.707 341.526 245.275 346.738C217.842 351.95 189.451 346.97 165.43 332.733V332.733L125.745 343.969C124.119 344.444 122.396 344.474 120.754 344.054C119.113 343.634 117.615 342.781 116.417 341.583C115.22 340.385 114.366 338.887 113.946 337.246C113.526 335.604 113.556 333.881 114.031 332.255L125.267 292.57Z" stroke="white" stroke-width="20" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M224 248.344C231.922 248.344 238.344 241.922 238.344 234C238.344 226.078 231.922 219.656 224 219.656C216.078 219.656 209.656 226.078 209.656 234C209.656 241.922 216.078 248.344 224 248.344Z" fill="white"/>
                            <path d="M166.625 248.344C174.547 248.344 180.969 241.922 180.969 234C180.969 226.078 174.547 219.656 166.625 219.656C158.703 219.656 152.281 226.078 152.281 234C152.281 241.922 158.703 248.344 166.625 248.344Z" fill="white"/>
                            <path d="M281.375 248.344C289.297 248.344 295.719 241.922 295.719 234C295.719 226.078 289.297 219.656 281.375 219.656C273.453 219.656 267.031 226.078 267.031 234C267.031 241.922 273.453 248.344 281.375 248.344Z" fill="white"/>
                            <path d="M385.807 268V195.273H429.415V203.085H394.614V227.659H426.148V235.472H394.614V268H385.807ZM462.227 269.136C456.972 269.136 452.438 267.976 448.626 265.656C444.839 263.312 441.915 260.045 439.855 255.855C437.819 251.641 436.801 246.741 436.801 241.153C436.801 235.566 437.819 230.642 439.855 226.381C441.915 222.096 444.779 218.758 448.449 216.366C452.142 213.952 456.451 212.744 461.375 212.744C464.216 212.744 467.021 213.218 469.791 214.165C472.561 215.112 475.082 216.651 477.355 218.781C479.628 220.888 481.439 223.682 482.788 227.162C484.138 230.642 484.812 234.927 484.812 240.017V243.568H442.767V236.324H476.29C476.29 233.246 475.674 230.5 474.443 228.085C473.236 225.67 471.508 223.765 469.259 222.368C467.033 220.971 464.405 220.273 461.375 220.273C458.037 220.273 455.149 221.101 452.71 222.759C450.295 224.392 448.437 226.523 447.135 229.151C445.833 231.778 445.182 234.596 445.182 237.602V242.432C445.182 246.551 445.892 250.043 447.312 252.908C448.757 255.749 450.757 257.915 453.314 259.406C455.871 260.874 458.842 261.608 462.227 261.608C464.429 261.608 466.418 261.3 468.193 260.685C469.992 260.045 471.543 259.098 472.845 257.844C474.147 256.565 475.153 254.979 475.864 253.085L483.96 255.358C483.108 258.104 481.676 260.519 479.663 262.602C477.651 264.662 475.165 266.272 472.206 267.432C469.247 268.568 465.92 269.136 462.227 269.136ZM520.43 269.136C515.175 269.136 510.641 267.976 506.83 265.656C503.042 263.312 500.118 260.045 498.058 255.855C496.022 251.641 495.004 246.741 495.004 241.153C495.004 235.566 496.022 230.642 498.058 226.381C500.118 222.096 502.982 218.758 506.652 216.366C510.345 213.952 514.654 212.744 519.578 212.744C522.419 212.744 525.224 213.218 527.994 214.165C530.764 215.112 533.286 216.651 535.558 218.781C537.831 220.888 539.642 223.682 540.991 227.162C542.341 230.642 543.016 234.927 543.016 240.017V243.568H500.97V236.324H534.493C534.493 233.246 533.877 230.5 532.646 228.085C531.439 225.67 529.711 223.765 527.462 222.368C525.236 220.971 522.608 220.273 519.578 220.273C516.24 220.273 513.352 221.101 510.913 222.759C508.499 224.392 506.64 226.523 505.338 229.151C504.036 231.778 503.385 234.596 503.385 237.602V242.432C503.385 246.551 504.095 250.043 505.516 252.908C506.96 255.749 508.96 257.915 511.517 259.406C514.074 260.874 517.045 261.608 520.43 261.608C522.632 261.608 524.621 261.3 526.396 260.685C528.196 260.045 529.746 259.098 531.048 257.844C532.35 256.565 533.357 254.979 534.067 253.085L542.163 255.358C541.311 258.104 539.879 260.519 537.866 262.602C535.854 264.662 533.368 266.272 530.409 267.432C527.45 268.568 524.124 269.136 520.43 269.136ZM576.361 269.136C571.815 269.136 567.803 267.988 564.322 265.692C560.842 263.372 558.12 260.105 556.155 255.891C554.19 251.653 553.207 246.646 553.207 240.869C553.207 235.14 554.19 230.169 556.155 225.955C558.12 221.741 560.854 218.485 564.358 216.189C567.862 213.893 571.91 212.744 576.503 212.744C580.054 212.744 582.859 213.336 584.919 214.52C587.002 215.68 588.589 217.006 589.678 218.497C590.79 219.965 591.654 221.172 592.27 222.119H592.98V195.273H601.361V268H593.264V259.619H592.27C591.654 260.614 590.778 261.868 589.642 263.384C588.506 264.875 586.884 266.213 584.777 267.396C582.67 268.556 579.865 269.136 576.361 269.136ZM577.497 261.608C580.859 261.608 583.7 260.732 586.02 258.98C588.34 257.205 590.104 254.754 591.311 251.629C592.518 248.481 593.122 244.847 593.122 240.727C593.122 236.655 592.53 233.092 591.347 230.038C590.163 226.961 588.411 224.57 586.091 222.865C583.771 221.137 580.906 220.273 577.497 220.273C573.946 220.273 570.987 221.184 568.619 223.007C566.276 224.806 564.512 227.257 563.328 230.358C562.168 233.436 561.588 236.892 561.588 240.727C561.588 244.61 562.18 248.137 563.364 251.31C564.571 254.458 566.347 256.968 568.69 258.838C571.058 260.685 573.993 261.608 577.497 261.608ZM619.01 268V195.273H627.391V222.119H628.101C628.716 221.172 629.569 219.965 630.658 218.497C631.77 217.006 633.357 215.68 635.416 214.52C637.5 213.336 640.317 212.744 643.868 212.744C648.461 212.744 652.509 213.893 656.013 216.189C659.517 218.485 662.251 221.741 664.216 225.955C666.181 230.169 667.163 235.14 667.163 240.869C667.163 246.646 666.181 251.653 664.216 255.891C662.251 260.105 659.528 263.372 656.048 265.692C652.568 267.988 648.555 269.136 644.01 269.136C640.506 269.136 637.701 268.556 635.594 267.396C633.487 266.213 631.865 264.875 630.729 263.384C629.592 261.868 628.716 260.614 628.101 259.619H627.107V268H619.01ZM627.249 240.727C627.249 244.847 627.852 248.481 629.06 251.629C630.267 254.754 632.031 257.205 634.351 258.98C636.671 260.732 639.512 261.608 642.874 261.608C646.377 261.608 649.301 260.685 651.645 258.838C654.012 256.968 655.788 254.458 656.972 251.31C658.179 248.137 658.783 244.61 658.783 240.727C658.783 236.892 658.191 233.436 657.007 230.358C655.847 227.257 654.083 224.806 651.716 223.007C649.372 221.184 646.425 220.273 642.874 220.273C639.464 220.273 636.6 221.137 634.28 222.865C631.96 224.57 630.208 226.961 629.024 230.038C627.84 233.092 627.249 236.655 627.249 240.727ZM696.034 269.278C692.578 269.278 689.441 268.627 686.624 267.325C683.806 266 681.569 264.094 679.912 261.608C678.255 259.098 677.426 256.068 677.426 252.517C677.426 249.392 678.042 246.859 679.273 244.918C680.504 242.953 682.149 241.414 684.209 240.301C686.268 239.188 688.541 238.36 691.027 237.815C693.536 237.247 696.058 236.797 698.591 236.466C701.905 236.04 704.592 235.72 706.652 235.507C708.735 235.27 710.25 234.88 711.197 234.335C712.168 233.791 712.653 232.844 712.653 231.494V231.21C712.653 227.706 711.695 224.984 709.777 223.043C707.883 221.101 705.007 220.131 701.148 220.131C697.147 220.131 694.01 221.007 691.737 222.759C689.464 224.51 687.866 226.381 686.943 228.369L678.989 225.528C680.409 222.214 682.303 219.634 684.67 217.787C687.062 215.917 689.666 214.615 692.483 213.881C695.324 213.123 698.117 212.744 700.864 212.744C702.616 212.744 704.628 212.957 706.901 213.384C709.197 213.786 711.411 214.626 713.541 215.905C715.696 217.183 717.483 219.113 718.903 221.693C720.324 224.274 721.034 227.73 721.034 232.062V268H712.653V260.614H712.227C711.659 261.797 710.712 263.064 709.386 264.413C708.061 265.763 706.297 266.911 704.095 267.858C701.893 268.805 699.206 269.278 696.034 269.278ZM697.312 261.75C700.627 261.75 703.42 261.099 705.693 259.797C707.99 258.495 709.718 256.814 710.878 254.754C712.062 252.695 712.653 250.528 712.653 248.256V240.585C712.298 241.011 711.517 241.402 710.31 241.757C709.126 242.089 707.753 242.384 706.19 242.645C704.652 242.882 703.148 243.095 701.68 243.284C700.236 243.45 699.064 243.592 698.165 243.71C695.987 243.994 693.951 244.456 692.057 245.095C690.187 245.711 688.671 246.646 687.511 247.901C686.375 249.132 685.807 250.812 685.807 252.943C685.807 255.855 686.884 258.057 689.038 259.548C691.216 261.016 693.974 261.75 697.312 261.75ZM758.49 269.136C753.376 269.136 748.973 267.929 745.279 265.514C741.586 263.099 738.745 259.773 736.757 255.536C734.768 251.298 733.774 246.456 733.774 241.011C733.774 235.472 734.792 230.583 736.828 226.345C738.887 222.084 741.752 218.758 745.422 216.366C749.115 213.952 753.423 212.744 758.348 212.744C762.183 212.744 765.639 213.455 768.717 214.875C771.795 216.295 774.316 218.284 776.281 220.841C778.246 223.398 779.465 226.381 779.939 229.79H771.558C770.919 227.304 769.498 225.102 767.297 223.185C765.118 221.243 762.183 220.273 758.49 220.273C755.223 220.273 752.358 221.125 749.896 222.83C747.458 224.51 745.552 226.89 744.179 229.967C742.829 233.021 742.154 236.608 742.154 240.727C742.154 244.941 742.817 248.611 744.143 251.736C745.493 254.861 747.386 257.287 749.825 259.016C752.287 260.744 755.175 261.608 758.49 261.608C760.668 261.608 762.645 261.229 764.42 260.472C766.196 259.714 767.699 258.625 768.93 257.205C770.161 255.784 771.037 254.08 771.558 252.091H779.939C779.465 255.311 778.293 258.211 776.423 260.791C774.576 263.348 772.126 265.384 769.072 266.899C766.042 268.391 762.514 269.136 758.49 269.136ZM800.002 248.114L799.86 237.744H801.565L825.429 213.455H835.798L810.372 239.165H809.662L800.002 248.114ZM792.19 268V195.273H800.571V268H792.19ZM826.849 268L805.542 241.011L811.508 235.188L837.502 268H826.849ZM885.221 225.67L877.692 227.801C877.219 226.546 876.521 225.327 875.597 224.143C874.698 222.936 873.467 221.942 871.904 221.161C870.342 220.379 868.341 219.989 865.903 219.989C862.565 219.989 859.783 220.758 857.558 222.297C855.356 223.812 854.255 225.741 854.255 228.085C854.255 230.169 855.013 231.814 856.528 233.021C858.043 234.229 860.41 235.235 863.63 236.04L871.727 238.028C876.603 239.212 880.237 241.023 882.629 243.462C885.02 245.876 886.215 248.99 886.215 252.801C886.215 255.926 885.316 258.72 883.516 261.182C881.741 263.644 879.255 265.585 876.059 267.006C872.863 268.426 869.146 269.136 864.908 269.136C859.345 269.136 854.74 267.929 851.094 265.514C847.449 263.099 845.14 259.572 844.17 254.932L852.124 252.943C852.882 255.879 854.314 258.08 856.421 259.548C858.552 261.016 861.334 261.75 864.766 261.75C868.673 261.75 871.774 260.921 874.07 259.264C876.39 257.583 877.55 255.571 877.55 253.227C877.55 251.333 876.888 249.747 875.562 248.469C874.236 247.167 872.2 246.196 869.454 245.557L860.363 243.426C855.368 242.242 851.698 240.408 849.354 237.922C847.034 235.412 845.874 232.276 845.874 228.511C845.874 225.434 846.738 222.711 848.467 220.344C850.219 217.976 852.598 216.118 855.604 214.768C858.635 213.419 862.067 212.744 865.903 212.744C871.3 212.744 875.538 213.928 878.616 216.295C881.717 218.663 883.919 221.788 885.221 225.67Z" fill="white"/>`,
                        `</svg>`,

                    `</a>`,

                `</header>`,

                `<div style="@import url('https://fonts.googleapis.com/css2?family=Inter&display=swap'); font-family: 'Inter', sans-serif;margin-left: 20px;">`,
                    `<h1 style="font-size: 32px;">Novo feedback sobre app</h1>`,
                    `<p style="font-size: 14px;">Verificar as solicitações e responder ao usuario</p>`,
                    `<p  style="font-size: 14px;">Tipo de feedback: ${type}</p>`,
                    `<p  style="font-size: 14px;">${comment}</p>`,
                `</div>`,
                screenshot ? `<img src="${screenshot}" style=" width:1024"/>` : ``,
                `</div>`
            ].join('\n')
        })
    }

}