class NumberFormat extends Intl.NumberFormat {

    format(number) {
        const num = super.format(number);
        return ((num === "-0" || num === "-0.0" || num === "-0.00") ? "0" : num)
    }

}
  
export const nf00 = new NumberFormat('en-US', {minimumFractionDigits: 0, maximumFractionDigits: 0});
export const nf11 = new NumberFormat('en-US', {minimumFractionDigits: 1, maximumFractionDigits: 1});
export const nf22 = new NumberFormat('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2});
export const nf23 = new NumberFormat('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 3});
export const nf02 = new NumberFormat("en-US", {minimumFractionDigits: 0, maximumFractionDigits: 2});
